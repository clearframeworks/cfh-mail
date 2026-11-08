/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// The SMTP and IMAP servers below are Thunderbird's in-process test fakes.
// The test transfers the captured message between the two fake servers; it
// never contacts a real account or sends to an external mail service.
add_task(async function test_cfh_local_smtp_to_imap() {
  setupIMAPPump();
  const smtpDaemon = new SmtpDaemon();
  const smtpFake = new nsMailServer(d => new SMTP_RFC2821_handler(d), smtpDaemon);
  smtpFake.start();
  let smtp;
  try {
    smtp = localAccountUtils.create_outgoing_server("smtp", "user", "password", {
      port: smtpFake.port,
      hostname: "localhost",
    });
    smtp.authMethod = Ci.nsMsgAuthMethod.none;
    smtp.socketType = Ci.nsMsgSocketType.plain;
    const identity = MailServices.accounts.createIdentity();
    identity.email = "cfh-test@example.invalid";
    identity.smtpServerKey = smtp.key;

    const nonce = Services.uuid.generateUUID().toString().replace(/[{}]/g, "");
    const messageId = `cfh-${nonce}@example.invalid`;
    const subject = `CFH local mailbox ${nonce}`;
    const body = `CFH local body ${nonce}.`;
    const raw =
      "From: cfh-test@example.invalid\r\n" +
      "To: cfh-test@example.invalid\r\n" +
      `Subject: ${subject}\r\n` +
      `Message-ID: <${messageId}>\r\n` +
      `\r\n${body}\r\n`;
    const profile = do_get_profile();
    profile.append("cfh-local-test.eml");
    await IOUtils.writeUTF8(profile.path, raw);
    const send = new PromiseTestUtils.PromiseMsgOutgoingListener();
    smtp.sendMailMessage(
      profile,
      MailServices.headerParser.parseEncodedHeaderW("cfh-test@example.invalid"),
      [], identity, identity.email, null, null, false, `<${messageId}>`, send
    );
    await send.promise;
    Assert.ok(smtpDaemon.post.includes(body), "SMTP fake captured the body");
    Assert.ok(smtpDaemon.post.includes(messageId), "SMTP fake captured the message ID");

    // Simulated local delivery: seed IMAP with the exact SMTP-captured data.
    const uri = Services.io.newURI("data:text/plain;base64," + btoa(smtpDaemon.post));
    IMAPPump.mailbox.addMessage(new ImapMessage(uri.spec, IMAPPump.mailbox.uidnext++, []));
    const received = new PromiseTestUtils.PromiseUrlListener();
    IMAPPump.inbox.updateFolderWithListener(null, received);
    await received.promise;
    const header = IMAPPump.inbox.msgDatabase.getMsgHdrForMessageID(messageId);
    Assert.ok(header, "IMAP client received the captured test message");
    Assert.equal(header.mime2DecodedSubject, subject);
    const output = do_get_profile();
    output.append("cfh-imap-received.eml");
    const fetch = new PromiseTestUtils.PromiseUrlListener();
    Cc["@mozilla.org/messenger/messageservice;1?type=imap"]
      .getService(Ci.nsIMsgMessageService)
      .saveMessageToDisk(IMAPPump.inbox.getUriForMsg(header), output, fetch, true, null);
    await fetch.promise;
    const retrieved = await IOUtils.readUTF8(output.path);
    Assert.ok(retrieved.includes(body), "IMAP client fetched the unique SMTP-captured body");
    Assert.ok(retrieved.includes(messageId), "IMAP fetch has the SMTP-captured message ID");
  } finally {
    if (smtp) {
      smtp.closeCachedConnections();
    }
    smtpFake.stop();
    teardownIMAPPump();
  }
});

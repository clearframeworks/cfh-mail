/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
// CFH evaluation: no Thunderbird-branded start page or notification feed.
// This does not disable all external services. No CFH updater is configured.
pref("mailnews.start_page.enabled", false);
pref("mailnews.start_page.url", "about:blank");
pref("mail.inappnotifications.enabled", false);
pref("mail.inappnotifications.url", "");
// Evaluation defaults only: actual packaged behavior still requires network testing.
pref("datareporting.healthreport.uploadEnabled", false);
pref("toolkit.telemetry.enabled", false);

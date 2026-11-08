# CFH Mail evaluation: external services review

Status: incomplete. Do not distribute the evaluation build. This is a static inventory of selected Thunderbird 159.0 source defaults, not a network trace or complete service audit. Some preferences appear under compile-time conditionals; their presence here does not prove they are active. Other inherited services may exist outside the files reviewed.

| Area | Observed upstream source reference | Release gate |
| --- | --- | --- |
| Application updates | `mail/moz.configure` sets an upstream update host; the evaluation mozconfig specifies `--disable-updater`. | Confirm compiled settings and network behavior. A secure CFH update channel must exist and be tested before distribution. |
| Thunderbird start page and notifications | Upstream nightly branding references live.thunderbird.net and notifications.thunderbird.net. | CFH evaluation branding disables its start page and in-app notification preference. Verify actual packaged defaults, fresh and existing profiles, and requests. |
| Telemetry and crash reporting | `mail/app/profile/all-thunderbird.js` references incoming-telemetry.thunderbird.net, health-report preferences and crash-stats.mozilla.com. | Determine actual compiled behavior, data flows and lawful service use; provide understandable privacy controls. |
| Add-ons and remote settings | Upstream references services.addons.thunderbird.net, addons.thunderbird.net, versioncheck.addons.thunderbird.net and thunderbird-settings.thunderbird.net; it also references Mozilla blocklist URLs. | Verify service terms and branding compatibility, security updates, failure behavior and privacy. Do not blindly disable blocklists or claim an equivalent service exists. |
| Account setup and identity | Upstream contains account autoconfiguration and, under conditions, Firefox Account endpoints. | Audit exact compiled endpoints and OAuth registrations; test only approved synthetic/local services unless the owner explicitly authorizes real accounts. Do not send mail without authorization. |
| Help and legal links | Upstream references support.thunderbird.net, Mozilla privacy pages and release notes. | Preserve accurate upstream attribution while avoiding endorsement or misrepresenting CFH support and privacy practices. |

Static source reviewed: Thunderbird 159.0 release f88f34886f667703f55095f2ede6f31b15b42116, with Gecko FIREFOX_159_0_BUILD1. The custom CFH branding is an unbuilt Windows non-enterprise evaluation. No independent update service, exhaustive security audit, account-flow test, or installer is established.
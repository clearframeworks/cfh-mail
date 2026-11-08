# CFH Mail evaluation build

Independent unreleased evaluation of Thunderbird 159.0. The Mozilla platform
must use FIREFOX_159_0_BUILD1. Do not enable official Thunderbird branding.
Original source and covered modifications remain under their applicable licenses.

This candidate has no CFH update service. The updater is disabled for isolated
testing; do not distribute this build. Other upstream external services have not
been fully audited. The application identity and profile isolation must be
verified before the executable is launched; existing Thunderbird profiles and
accounts must never be used for test runs. No email may be sent without explicit
authorization.
Scope is Windows, non-enterprise evaluation only. Mac branding files are not provided; Linux and enterprise identity paths have not been changed or validated. The custom source sets a CFH-specific app/profile ID and disables profile migration, but no build has confirmed those settings. Use only a fresh disposable profile on a disposable runner. cfh-build/SERVICES-REVIEW.md records unresolved service and OAuth concerns.

# Maker beta/support patch

## Included
- `beta.html`: manual-approval beta application form.
- `support.html`: known-email-only support/feedback form.
- `forms.js`: calls restricted Supabase RPCs using the project's public publishable key.
- `beta-support.css`: form styling.
- `script.js`: homepage beta CTA + current pricing/storage/branding alignment.
- `.cpanel.yml`: deploys all new files.
- `supabase/001_beta_waitlist_support.sql`: creates tables, RLS, 10 Android/10 iOS approval cap, public intake RPCs, known-email support gating, and simple rate limiting.

## One required Supabase action
Open the SQL Editor for `cloverbee-maker-dev`, paste `supabase/001_beta_waitlist_support.sql`, and run it once.

The website uses a Supabase **publishable** key. It is intentionally public. No service-role/database secret is present in the website.

## GitHub / WHC
The ChatGPT GitHub integration gets HTTP 403 for writes to `CloverBeeVentures`, so upload/replace these files in `CloverBeeVentures/cloverbee-maker-web`:
- beta.html (new)
- support.html (replace)
- beta-support.css (new)
- forms.js (new)
- script.js (replace)
- .cpanel.yml (replace)

Then in cPanel Git: Update from Remote -> Deploy HEAD Commit.

## Beta approvals
In Supabase Table Editor -> `beta_waitlist`, applications start as `pending`. Change `status` to `approved` to admit someone. The database refuses an 11th approved/active Android tester or an 11th approved/active iOS tester.

## Support
Legitimate requests appear in `support_submissions` as `new`. Unknown emails receive the same success response but are not retained.

## Optional later
Once the WHC no-reply mailbox is ready, add email notifications for legitimate beta/support submissions.

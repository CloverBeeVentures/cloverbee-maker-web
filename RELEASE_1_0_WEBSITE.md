# CloverBee Maker 1.0 website release prep

This document records the website release controls for Maker 1.0 on Google Play and the pending Apple App Store release.

## Current state

- Maker 1.0.0 (11) was published on Google Play on October 19, 2026.
- Maker 1.0 Build 11 is Waiting for Review with Apple.
- App Store release mode is manual.
- The Google Play listing is https://play.google.com/store/apps/details?id=ca.cloverbee.maker.
- Do not enable Apple live-launch wording until the public App Store build has been verified after manual release.

## Prepared on this branch

- Final Canadian Free/Paid pricing language: Free, C$8.99/month, C$89.99/year.
- Square copy reflects the shipping Maker 1.0 Point of Sale handoff rather than a planned beta feature.
- Free and Paid are described as shipping together in the iOS app.
- Android is presented as available on Google Play; iOS remains Waiting for Review.
- Old Early Access/Beta CTAs direct Android visitors to Google Play while preserving accurate Apple review status.
- The homepage release state is controlled in `script.js` with `RELEASE_CONFIG.state` and `RELEASE_CONFIG.appStoreUrl` so the final launch switch is deliberately small.
- Changelog includes the October 19 Android 1.0 launch and the current Apple Build 11 review/manual-release status.

## Genuine App Store screenshots

The five original iPhone PNGs used for the Maker 1.0 App Store submission are durably stored in this repository at:

- `assets/screenshots/ios/1.0/01-home.png`
- `assets/screenshots/ios/1.0/02-inventory.png`
- `assets/screenshots/ios/1.0/03-orders.png`
- `assets/screenshots/ios/1.0/04-sell.png`
- `assets/screenshots/ios/1.0/05-reports.png` (Sales history)

Each original is 1242 × 2688. The website uses the originals directly inside CSS device-style frames; it does not crop, redraw or replace the screenshot pixels. The hero and five-step gallery have replaced the former concept interface art.

## Apple launch switch

After Apple approval:

1. Owner manually releases Maker.
2. Wait for the public listing to resolve.
3. Install the public App Store build and run the launch smoke test.
4. In `script.js`, set `RELEASE_CONFIG.ios.url` to the verified public App Store URL.
5. In the same object, change `RELEASE_CONFIG.ios.state` from `pending` to `live`.
6. That centralized switch changes every release CTA to **Download on the App Store**, changes the availability card and status copy to **Available on iPhone and iPad**, changes the final callout/footer, and adds the public App Store URL to the SoftwareApplication structured data as `downloadUrl` and `installUrl`.
7. There is no separate launch banner at present. If one is added on release day, keep its state driven by `RELEASE_CONFIG` rather than hard-coding availability elsewhere.
8. Verify the public App Store URL, homepage, pricing, Square, support, privacy, terms, changelog and structured data.
9. Merge/deploy the website only after the public build passes the smoke test.

The Android live switch is already enabled with the verified Google Play URL. No Apple release-day announcement should precede the verified public App Store build.

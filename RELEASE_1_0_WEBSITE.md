# CloverBee Maker 1.0 website release prep

This branch prepares the public Maker site for the 1.0 App Store launch without publishing `available now` before the app is actually live.

## Current state

- Maker 1.0 Build 7 is in Apple App Review.
- App Store release mode is manual.
- The website release branch is `release/maker-1.0-site-refresh`.
- Do not merge/deploy live-launch wording until the public App Store build has been verified after manual release.

## Prepared on this branch

- Final Canadian Free/Paid pricing language: Free, C$8.99/month, C$89.99/year.
- Square copy reflects the shipping Maker 1.0 Point of Sale handoff rather than a planned beta feature.
- Free and Paid are described as shipping together in the iOS app.
- iOS is described as submitted to Apple App Review; Android/Google Play remains a later release.
- Old Early Access/Beta CTAs are converted to release-pending CTAs while Apple review is outstanding.
- The homepage release state is controlled in `script.js` with `RELEASE_CONFIG.state` and `RELEASE_CONFIG.appStoreUrl` so the final launch switch is deliberately small.
- Changelog now includes the Maker 1.0 Build 7 public-release entry while clearly identifying the current App Review/manual-release status.

## Genuine App Store screenshots

The five original iPhone PNGs used for the Maker 1.0 App Store submission are durably stored in this repository at:

- `assets/screenshots/ios/1.0/01-home.png`
- `assets/screenshots/ios/1.0/02-inventory.png`
- `assets/screenshots/ios/1.0/03-orders.png`
- `assets/screenshots/ios/1.0/04-sell.png`
- `assets/screenshots/ios/1.0/05-reports.png` (Sales history)

Each original is 1242 × 2688. The website uses the originals directly inside CSS device-style frames; it does not crop, redraw or replace the screenshot pixels. The hero and five-step gallery have replaced the former concept interface art.

## Final launch switch

After Apple approval:

1. Owner manually releases Maker.
2. Wait for the public listing to resolve.
3. Install the public App Store build and run the launch smoke test.
4. In `script.js`, set `RELEASE_CONFIG.appStoreUrl` to the verified public App Store URL.
5. In the same object, change `RELEASE_CONFIG.state` from `review` to `live`.
6. That centralized switch changes every release CTA to **Download on the App Store**, changes the availability card and status copy to **Available on iPhone and iPad**, changes the final callout/footer, and adds the public App Store URL to the SoftwareApplication structured data as `downloadUrl` and `installUrl`.
7. There is no separate launch banner at present. If one is added on release day, keep its state driven by `RELEASE_CONFIG` rather than hard-coding availability elsewhere.
8. Verify the public App Store URL, homepage, pricing, Square, support, privacy, terms, changelog and structured data.
9. Merge/deploy the website only after the public build passes the smoke test.

No release-day social announcement should precede the verified public App Store build.

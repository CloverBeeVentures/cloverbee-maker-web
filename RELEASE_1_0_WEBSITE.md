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
- The homepage release state is controlled in `script.js` with `RELEASE_STATE` and `APP_STORE_URL` so the final launch switch is deliberately small.
- Changelog now includes the Maker 1.0 Build 7 public-release entry while clearly identifying the current App Review/manual-release status.

## Remaining asset dependency: genuine App Store screenshots

The App Store screenshots used for submission are not currently stored in this website repository or in the Drive files visible to the connected tools. Do not fabricate replacements.

When the genuine images are available, add the five iPhone screenshots used in App Store Connect under:

- `assets/app-store/iphone/home.png`
- `assets/app-store/iphone/inventory.png`
- `assets/app-store/iphone/orders.png`
- `assets/app-store/iphone/sell.png`
- `assets/app-store/iphone/sales-history.png`

The submitted iPhone assets were 1242 × 2688. Equivalent iPad assets may be retained for App Store use but are optional for the website unless the layout benefits from them.

Replace the current concept/interface preview area with these genuine screenshots before the release-site branch is merged for launch. Preserve truthful captions; do not add features or data not present in the actual screenshots.

## Final launch switch

After Apple approval:

1. Owner manually releases Maker.
2. Wait for the public listing to resolve.
3. Install the public App Store build and run the launch smoke test.
4. Set `APP_STORE_URL` in `script.js` to the public listing.
5. Change `RELEASE_STATE` from `review` to `live`.
6. Replace the concept previews with the genuine App Store screenshot assets if not already completed.
7. Verify homepage, pricing, Square, support, privacy, terms, changelog and App Store links.
8. Deploy/merge the website only after the public build passes the smoke test.

No release-day social announcement should precede the verified public App Store build.

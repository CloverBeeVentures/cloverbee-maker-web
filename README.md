# CloverBee Maker Website

Static marketing website for CloverBee Maker.

## Deployment

The repository is intended to be the source of truth for the public website. Production deployment will be configured through WHC/cPanel after the domain document root is confirmed.

## Local preview

Any static web server will work. For example, with Python installed:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Important content status

- Maker 1.0 Build 7 is in Apple App Review with manual release.
- Canadian pricing is Free, C$8.99/month and C$89.99/year.
- Square Point of Sale handoff is part of Maker 1.0.
- Genuine App Store screenshots are stored under `assets/screenshots/ios/1.0/`.
- Android/Google Play is a later release and is not currently presented as available.
- The centralized review/live switch is documented in `RELEASE_1_0_WEBSITE.md`.

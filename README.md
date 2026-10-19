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

- Maker 1.0.0 (11) is publicly available on Google Play in Canada and the United States.
- Maker 1.0 Build 11 is Waiting for Review with Apple; manual release remains enabled.
- Canadian pricing is Free, C$8.99/month and C$89.99/year.
- Square Point of Sale handoff is part of Maker 1.0.
- Genuine App Store screenshots are stored under `assets/screenshots/ios/1.0/`.
- Google Play URL: https://play.google.com/store/apps/details?id=ca.cloverbee.maker
- The centralized per-platform release switch is documented in `RELEASE_1_0_WEBSITE.md`.

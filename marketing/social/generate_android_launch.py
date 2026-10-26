#!/usr/bin/env python3
"""Generate the CloverBee Maker Android 1.0 launch social card."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent

SIZE = 1080
CREAM = "#FFF8EC"
ESPRESSO = "#3B2A22"
GREEN = "#0A6739"
ORANGE = "#C96A2B"
SAGE = "#DDE9DF"
WHITE = "#FFFFFF"


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        Path(f"/usr/share/fonts/opentype/inter/Inter-{weight}.otf"),
        Path(f"/usr/share/fonts/truetype/inter/Inter-{weight}.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    fallback = "LiberationSans-Bold.ttf" if weight != "Regular" else "LiberationSans-Regular.ttf"
    return ImageFont.truetype(f"/usr/share/fonts/truetype/liberation/{fallback}", size)


def contain(image: Image.Image, width: int, height: int) -> Image.Image:
    copy = image.copy()
    copy.thumbnail((width, height), Image.Resampling.LANCZOS)
    return copy


def main() -> None:
    canvas = Image.new("RGB", (SIZE, SIZE), CREAM)
    draw = ImageDraw.Draw(canvas)

    # Quiet workshop-style structure with the locked brand palette.
    draw.rounded_rectangle((54, 54, 1026, 1026), radius=46, fill="#FFFBF3")
    draw.ellipse((690, -170, 1190, 330), fill=SAGE)
    draw.rounded_rectangle((54, 970, 1026, 1026), radius=28, fill=GREEN)

    mark = Image.open(ROOT / "cloverbee-mark.png").convert("RGBA")
    mark = mark.resize((104, 104), Image.Resampling.LANCZOS)
    canvas.paste(mark, (108, 105), mark)

    draw.text((236, 124), "CloverBee Maker", font=font("ExtraBold", 42), fill=ESPRESSO)
    draw.text((110, 277), "NOW ON", font=font("SemiBold", 31), fill=ORANGE)
    draw.text((106, 318), "GOOGLE PLAY", font=font("ExtraBold", 72), fill=ESPRESSO)
    draw.rounded_rectangle((110, 422, 248, 431), radius=5, fill=ORANGE)

    copy = "Run the business behind\nwhat you make."
    draw.multiline_text((110, 482), copy, font=font("Bold", 45), fill=ESPRESSO, spacing=12)
    draw.text((110, 620), "Inventory · Production", font=font("SemiBold", 25), fill=GREEN)
    draw.text((110, 658), "Orders · Sales · Expenses", font=font("SemiBold", 25), fill=GREEN)

    # Real Android app screenshot in a restrained device frame.
    screenshot = Image.open(ROOT / "assets/screenshots/android/1.0/00-business-choice.png").convert("RGB")
    screenshot = screenshot.resize((302, 671), Image.Resampling.LANCZOS)
    shadow = Image.new("RGBA", (390, 770), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((34, 34, 356, 740), radius=54, fill=(59, 42, 34, 54))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    canvas.paste(shadow, (646, 204), shadow)
    draw.rounded_rectangle((690, 216, 1022, 936), radius=52, fill=ESPRESSO)
    draw.rounded_rectangle((705, 231, 1007, 921), radius=40, fill=WHITE)
    mask = Image.new("L", (302, 690), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 302, 690), radius=38, fill=255)
    shot_layer = Image.new("RGB", (302, 690), WHITE)
    shot_layer.paste(screenshot, (0, 9))
    canvas.paste(shot_layer, (705, 231), mask)
    draw.rounded_rectangle((809, 243, 903, 253), radius=5, fill=ESPRESSO)

    badge_path = OUT / "google-play-badge.png"
    if badge_path.exists():
        badge = contain(Image.open(badge_path).convert("RGBA"), 250, 96)
        canvas.paste(badge, (110, 758), badge)

    draw.text((110, 885), "ANDROID 1.0  ·  CANADA + U.S.", font=font("Bold", 22), fill=ESPRESSO)
    draw.text((110, 988), "cloverbeemaker.ca", font=font("SemiBold", 18), fill=CREAM)

    output = OUT / "cloverbee-maker-android-launch.png"
    canvas.save(output, optimize=True)
    print(output)


if __name__ == "__main__":
    main()

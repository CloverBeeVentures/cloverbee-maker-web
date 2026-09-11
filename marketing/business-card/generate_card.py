#!/usr/bin/env python3
"""Generate the locked CloverBee Maker 2.5-inch square business-card artwork.

Requirements:
  pip install pillow qrcode[pil]

Uses the repository's existing CloverBee mark without redrawing/recolouring it.
The real QR contains https://cloverbeemaker.ca/card.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode

DPI = 300
TRIM_IN = 2.5
BLEED_IN = 0.125
CANVAS_PX = round((TRIM_IN + 2 * BLEED_IN) * DPI)
SAFE_INSET = round((BLEED_IN + 0.125) * DPI)

CREAM = "#FFF8EC"
ESPRESSO = "#3B2A22"
GREEN = "#0A6739"
ORANGE = "#C96A2B"
WHITE = "#FFFFFF"
BLACK = "#000000"
CARD_URL = "https://cloverbeemaker.ca/card"

ROOT = Path(__file__).resolve().parents[2]
LOGO_PATH = ROOT / "cloverbee-mark.png"
OUT = Path(__file__).resolve().parent

INTER_CANDIDATES = {
    "regular": [Path("/usr/share/fonts/opentype/inter/Inter-Regular.otf"), Path("/usr/share/fonts/truetype/inter/Inter-Regular.ttf")],
    "medium": [Path("/usr/share/fonts/opentype/inter/Inter-Medium.otf"), Path("/usr/share/fonts/truetype/inter/Inter-Medium.ttf")],
    "semibold": [Path("/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"), Path("/usr/share/fonts/truetype/inter/Inter-SemiBold.ttf")],
    "bold": [Path("/usr/share/fonts/opentype/inter/Inter-Bold.otf"), Path("/usr/share/fonts/truetype/inter/Inter-Bold.ttf")],
    "extrabold": [Path("/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"), Path("/usr/share/fonts/truetype/inter/Inter-ExtraBold.ttf")],
}

def inter(weight, size):
    for path in INTER_CANDIDATES[weight]:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    raise SystemExit(f"Inter {weight} not found. Install Inter locally before generating print art.")

def center_text(draw, text, y, font, fill):
    box = draw.textbbox((0, 0), text, font=font)
    draw.text(((CANVAS_PX - (box[2] - box[0])) / 2, y), text, font=font, fill=fill)

def load_mark(size):
    mark = Image.open(LOGO_PATH).convert("RGBA")
    return mark.resize((size, size), Image.Resampling.LANCZOS)

def make_front():
    img = Image.new("RGB", (CANVAS_PX, CANVAS_PX), CREAM)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([SAFE_INSET-16, SAFE_INSET-4, CANVAS_PX-SAFE_INSET+16, CANVAS_PX-SAFE_INSET+4], radius=34, fill="#FFFBF3")
    mark = load_mark(168)
    img.paste(mark, ((CANVAS_PX-168)//2, 138), mark)
    center_text(draw, "CloverBee Maker", 337, inter("extrabold", 61), ESPRESSO)
    center_text(draw, "Run the business behind what you make.", 433, inter("semibold", 29), ESPRESSO)
    draw.rounded_rectangle([(CANVAS_PX-112)//2, 515, (CANVAS_PX+112)//2, 522], radius=4, fill=ORANGE)
    center_text(draw, "Built for small-batch businesses.", 563, inter("regular", 24), ESPRESSO)
    return img

def make_back():
    img = Image.new("RGB", (CANVAS_PX, CANVAS_PX), CREAM)
    draw = ImageDraw.Draw(img)
    mark = load_mark(74)
    img.paste(mark, ((CANVAS_PX-74)//2, 77), mark)
    center_text(draw, "Inventory  •  Production", 170, inter("semibold", 27), ESPRESSO)
    center_text(draw, "Orders  •  Sales", 209, inter("semibold", 27), ESPRESSO)

    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=4)
    qr.add_data(CARD_URL)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color=BLACK, back_color=WHITE).convert("RGB").resize((330, 330), Image.Resampling.NEAREST)
    qx, qy = (CANVAS_PX-330)//2, 284
    draw.rounded_rectangle([qx-14, qy-14, qx+344, qy+344], radius=14, fill=WHITE)
    img.paste(qr_img, (qx, qy))

    draw.rounded_rectangle([(CANVAS_PX-100)//2, 658, (CANVAS_PX+100)//2, 665], radius=4, fill=ORANGE)
    center_text(draw, "Scan to learn more", 690, inter("bold", 27), ESPRESSO)
    center_text(draw, "cloverbeemaker.ca/card", 739, inter("medium", 23), GREEN)
    return img

def main():
    make_front().save(OUT / "front.png", dpi=(DPI, DPI), optimize=True)
    make_back().save(OUT / "back.png", dpi=(DPI, DPI), optimize=True)
    print("Generated front.png and back.png at 825x825 px, 300 dpi, including 0.125-inch bleed.")

if __name__ == "__main__":
    main()

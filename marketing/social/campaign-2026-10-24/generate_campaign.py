#!/usr/bin/env python3
"""Build the four October 24 CloverBee Maker social cards."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "source"
MARK = ROOT.parents[2] / "cloverbee-mark.png"

CREAM = "#FFF8EC"
ESPRESSO = "#3B2A22"
GREEN = "#0A6739"
ORANGE = "#C96A2B"
SAGE = "#DDE9DF"

REGULAR = "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"
BOLD = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"

CARDS = [
    {
        "source": "01-costing-base.png",
        "output": "01-know-your-costs.png",
        "kicker": "COSTING",
        "headline": "KNOW WHAT\nIT COSTS\nBEFORE YOU PRICE.",
        "support": "Materials in. Better pricing out.",
    },
    {
        "source": "02-production-base.png",
        "output": "02-one-batch-every-step.png",
        "kicker": "PRODUCTION",
        "headline": "ONE BATCH.\nEVERY STEP.",
        "support": "Plan it. Make it. Move it to stock.",
    },
    {
        "source": "03-orders-base.png",
        "output": "03-packed-paid-picked-up.png",
        "kicker": "ORDERS",
        "headline": "PACKED.\nPAID.\nPICKED UP.",
        "support": "Keep every order moving.",
    },
    {
        "source": "04-market-base.png",
        "output": "04-market-day.png",
        "kicker": "SALES",
        "headline": "MARKET DAY,\nMINUS THE\nMYSTERY.",
        "support": "Know what sold. Know what’s left.",
    },
]


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def build(card: dict[str, str]) -> None:
    base = Image.open(SOURCE / card["source"]).convert("RGB")
    base = base.resize((1080, 1080), Image.Resampling.LANCZOS).convert("RGBA")

    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # A quiet cream panel protects hierarchy while leaving the workshop visible.
    draw.rounded_rectangle(
        (46, 46, 672, 692), radius=38, fill=(255, 248, 236, 244)
    )
    draw.rounded_rectangle((46, 944, 386, 1026), radius=28, fill=GREEN)

    mark = Image.open(MARK).convert("RGBA")
    mark.thumbnail((78, 78), Image.Resampling.LANCZOS)
    overlay.alpha_composite(mark, (82, 78))

    brand_font = font(BOLD, 35)
    kicker_font = font(BOLD, 30)
    headline_font = font(BOLD, 62)
    support_font = font(REGULAR, 29)
    footer_font = font(BOLD, 25)

    draw.text((176, 93), "CloverBee Maker", font=brand_font, fill=ESPRESSO)
    draw.text((82, 196), card["kicker"], font=kicker_font, fill=ORANGE)
    draw.rounded_rectangle((82, 246, 210, 256), radius=5, fill=ORANGE)
    draw.multiline_text(
        (78, 284),
        card["headline"],
        font=headline_font,
        fill=ESPRESSO,
        spacing=4,
    )
    draw.text((82, 616), card["support"], font=support_font, fill=GREEN)
    draw.text((82, 968), "cloverbeemaker.ca", font=footer_font, fill=CREAM)

    # A small sage stitch ties the graphic layer to the physical scene.
    draw.rounded_rectangle((610, 72, 642, 164), radius=16, fill=SAGE)
    draw.rounded_rectangle((622, 92, 630, 144), radius=4, fill=GREEN)

    final = Image.alpha_composite(base, overlay).convert("RGB")
    final.save(ROOT / card["output"], quality=96, optimize=True)


if __name__ == "__main__":
    for item in CARDS:
        build(item)


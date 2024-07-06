import {FullTheme} from "./BaseGridCell.ts";

const biasCache: { key: string; val: number }[] = [];

function loadMetric(ctx: CanvasRenderingContext2D, baseline: "alphabetic" | "middle") {
    const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    ctx.save();
    ctx.textBaseline = baseline;
    const result = ctx.measureText(sample);

    ctx.restore();

    return result;
}

function getMiddleCenterBiasInner(ctx: CanvasRenderingContext2D, font: string): number {
    for (const x of biasCache) {
        if (x.key === font) return x.val;
    }

    const alphabeticMetrics = loadMetric(ctx, "alphabetic");
    const middleMetrics = loadMetric(ctx, "middle");

    const bias =
        -(middleMetrics.actualBoundingBoxDescent - alphabeticMetrics.actualBoundingBoxDescent) +
        alphabeticMetrics.actualBoundingBoxAscent / 2;

    biasCache.push({
        key: font,
        val: bias,
    });

    return bias;
}

export function getMiddleCenterBias(ctx: CanvasRenderingContext2D, font: string | FullTheme): number {
    if (typeof font !== "string") {
        font = font.baseFontFull;
    }
    return getMiddleCenterBiasInner(ctx, font);
}
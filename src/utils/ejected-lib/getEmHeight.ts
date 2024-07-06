import {measureTextCached} from "@glideapps/glide-data-grid";

export function getEmHeight(ctx: CanvasRenderingContext2D, fontStyle: string): number {
    const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle); // do not question the magic string
    return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
}
// Ejected from data-grid-lib.js

import {BaseDrawArgs} from "@glideapps/glide-data-grid";
import {split as splitText} from "canvas-hypertxt";

import {direction} from "./ejected-lib/direction.ts";
import {BaseGridCell, FullTheme} from "./ejected-lib/BaseGridCell.ts";
import {getEmHeight} from "./ejected-lib/getEmHeight.ts";
import {getMiddleCenterBias} from "./ejected-lib/getMiddleCenterBias.ts";


function truncateString(data: string, w: number): string {
    if (data.includes("\n")) {
        // new lines are rare and split is relatively expensive compared to the search
        // it pays off to not do the split contantly. More accurately... it pays off not to run the regex.
        // what even is the point of this? So what if there is a /r at the end of a line? It wont be drawn anyway.
        data = data.split(/\r?\n/, 1)[0];
    }
    const max = w / 4; // no need to round, slice will just truncate this
    if (data.length > max) {
        data = data.slice(0, max);
    }
    return data;
}

function drawSingleTextLine(
    ctx: CanvasRenderingContext2D,
    data: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bias: number,
    theme: FullTheme,
    contentAlign?: BaseGridCell["contentAlign"]
) {
    if (contentAlign === "right") {
        ctx.fillText(data, x + w - (theme.cellHorizontalPadding + 0.5), y + h / 2 + bias);
    } else if (contentAlign === "center") {
        ctx.fillText(data, x + w / 2, y + h / 2 + bias);
    } else {
        ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
    }
}

function drawMultiLineText(
    ctx: CanvasRenderingContext2D,
    data: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bias: number,
    theme: FullTheme,
    contentAlign?: BaseGridCell["contentAlign"],
    hyperWrapping?: boolean
) {
    const fontStyle = theme.baseFontFull;
    const split = splitText(ctx, data, fontStyle, w - theme.cellHorizontalPadding * 2, hyperWrapping ?? false);

    const emHeight = getEmHeight(ctx, fontStyle);
    const lineHeight = theme.lineHeight * emHeight;

    const actualHeight = emHeight + lineHeight * (split.length - 1);
    const mustClip = actualHeight + theme.cellVerticalPadding > h;

    if (mustClip) {
        // well now we have to clip because we might render outside the cell vertically
        ctx.save();
        ctx.rect(x, y, w, h);
        ctx.clip();
    }

    const optimalY = y + h / 2 - actualHeight / 2;
    let drawY = Math.max(y + theme.cellVerticalPadding, optimalY);
    for (const line of split) {
        drawSingleTextLine(ctx, line, x, drawY, w, emHeight, bias, theme, contentAlign);
        drawY += lineHeight;
        if (drawY > y + h) break;
    }
    if (mustClip) {
        ctx.restore();
    }
}

export function drawTextCellEjected(
    args: Pick<BaseDrawArgs, "rect" | "ctx" | "theme">,
    data: string,
    contentAlign?: BaseGridCell["contentAlign"],
    allowWrapping?: boolean,
    hyperWrapping?: boolean
): void {
    const { ctx, rect, theme } = args;

    const { x, y, width: w, height: h } = rect;

    allowWrapping = allowWrapping ?? false;

    if (!allowWrapping) {
        data = truncateString(data, w);
    }

    const bias = getMiddleCenterBias(ctx, theme);

    const isRtl = direction(data) === "rtl";

    if (contentAlign === undefined && isRtl) {
        contentAlign = "right";
    }

    if (isRtl) {
        ctx.direction = "rtl";
    }

    if (data.length > 0) {
        let changed = false;
        if (contentAlign === "right") {
            // Use right alignment as default for RTL text
            ctx.textAlign = "right";
            changed = true;
        } else if (contentAlign !== undefined && contentAlign !== "left") {
            // Since default is start (=left), only apply if alignment is center or right
            ctx.textAlign = contentAlign;
            changed = true;
        }

        if (!allowWrapping) {
            drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign);
        } else {
            drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping);
        }

        if (changed) {
            // Reset alignment to default
            ctx.textAlign = "start";
        }

        if (isRtl) {
            ctx.direction = "inherit";
        }
    }
}
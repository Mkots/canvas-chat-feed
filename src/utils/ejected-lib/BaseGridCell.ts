import type {CSSProperties} from "react";

interface Theme {
    accentColor: string;
    accentFg: string;
    accentLight: string;
    textDark: string;
    textMedium: string;
    textLight: string;
    textBubble: string;
    bgIconHeader: string;
    fgIconHeader: string;
    textHeader: string;
    textGroupHeader?: string;
    textHeaderSelected: string;
    bgCell: string;
    bgCellMedium: string;
    bgHeader: string;
    bgHeaderHasFocus: string;
    bgHeaderHovered: string;
    bgBubble: string;
    bgBubbleSelected: string;
    bgSearchResult: string;
    borderColor: string;
    drilldownBorder: string;
    linkColor: string;
    cellHorizontalPadding: number;
    cellVerticalPadding: number;
    headerFontStyle: string;
    headerIconSize: number;
    baseFontStyle: string;
    markerFontStyle: string;
    fontFamily: string;
    editorFontSize: string;
    lineHeight: number;

    resizeIndicatorColor?: string;
    horizontalBorderColor?: string;
    headerBottomBorderColor?: string;
    roundingRadius?: number;
}
export interface FullTheme extends Theme {
    headerFontFull: string;
    baseFontFull: string;
    markerFontFull: string;
}
type CellActiviationBehavior = "double-click" | "single-click" | "second-click";

export interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly lastUpdated?: number;
    readonly style?: "normal" | "faded";
    readonly themeOverride?: Partial<Theme>;
    readonly span?: readonly [start: number, end: number];
    readonly contentAlign?: "left" | "right" | "center";
    readonly cursor?: CSSProperties["cursor"];
    readonly copyData?: string;
    readonly activationBehaviorOverride?: CellActiviationBehavior;
}
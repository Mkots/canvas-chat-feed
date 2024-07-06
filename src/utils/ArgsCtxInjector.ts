import {DrawArgs, InnerGridCell, Rectangle} from "@glideapps/glide-data-grid";

export const ArgsCtxInjector = <T extends InnerGridCell>(
    args: DrawArgs<T>,
    ctxProps: Partial<CanvasRenderingContext2D>,
    rect?: Partial<Rectangle>
): DrawArgs<T> => {
    if (rect && typeof rect === "object") {
        return Object.assign(
            Object.assign(
                args,
                {rect: Object.assign(args.rect, rect)}
            ),
            {ctx: Object.assign(args.ctx, ctxProps)}
        );
    }
    return Object.assign(args, {ctx: Object.assign(args.ctx, ctxProps)});
}
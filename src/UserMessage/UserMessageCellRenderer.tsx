import { UserMessageCell} from "./UserMessageCell";
import {CustomRenderer, GridCellKind} from "@glideapps/glide-data-grid";
import {ArgsCtxInjector} from "../utils/ArgsCtxInjector.ts";
import {drawTextCellEjected} from "../utils/DrawTextCellEjected.ts";


const UserMessageCellRenderer: CustomRenderer<UserMessageCell> = {
    kind: GridCellKind.Custom,
    //@ts-expect-error cell.data.kind is not assignable to type 'UserMessageCell'
    isMatch: (cell) => { return cell.data.kind  === "user_message"},
    draw:(args, cell) => {
        const { ctx, theme, rect } = args;
        const { name, message } = cell.data;
        ctx.save();

        // Draw name
        const nameRect = {...rect, y: rect.y - 45}
        drawTextCellEjected(
            ArgsCtxInjector(args, {font:`bold 14px ${theme.fontFamily}`, fillStyle: theme.textDark }, nameRect),
            name,
            "left",
            false,
            false)
        
        console.log('|>', nameRect);

        // Draw message
        const messageRect = {...rect, height: rect.height + 0}
        drawTextCellEjected(
            ArgsCtxInjector(args, {font:`normal 12px ${theme.fontFamily}`, fillStyle: theme.textMedium}, messageRect),
            message,
            "left",
            true,
            true)
        console.log('|>', messageRect);
        ctx.restore();

        return true;
    },
    provideEditor: () => () => <></>,
    onPaste: (v, d) => {
        // Handle pasting functionality if needed
        return {
            ...d,
            message: v,
        };
    },
    measure: (ctx, cell, t) => {
        const lines = cell.data.displayData.split("\n", cell.data.allowWrapping === true ? undefined : 1);
        let maxLineWidth = 0;
        for (const line of lines) {
            maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
        }
        return maxLineWidth + 2 * t.cellHorizontalPadding;
    }

};

export default UserMessageCellRenderer;

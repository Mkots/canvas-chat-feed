import { UserMessageCell} from "./UserMessageCell";
import { CustomRenderer, GridCellKind } from "@glideapps/glide-data-grid";


export const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    return lines;
};


const UserMessageCellRenderer: CustomRenderer<UserMessageCell> = {
    kind: GridCellKind.Custom,
    //@ts-expect-error cell.data.kind is not assignable to type 'UserMessageCell'
    isMatch: (cell) => { return cell.data.kind  === "user_message"},
    draw:(args, cell) => {
        const { ctx, theme, rect } = args;
        const { name, message } = cell.data;
        ctx.save();

        // Draw name
        ctx.font = `bold 14px ${theme.fontFamily}`;
        ctx.fillStyle = theme.textLight;
        ctx.textAlign = "left";
        const nameY = rect.y + 20;
        ctx.fillText(name, rect.x + theme.cellHorizontalPadding, nameY);

        // Draw message
        ctx.font = `normal 12px ${theme.fontFamily}`;
        ctx.fillStyle = theme.textMedium;
        const maxWidth = rect.width - theme.cellHorizontalPadding * 2;
        const messageLines = wrapText(ctx, message, maxWidth);
        let messageY = nameY + 20;

        messageLines.forEach(line => {
            ctx.fillText(line, rect.x + theme.cellHorizontalPadding, messageY);
            messageY += 14; // Line height
        });

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
    // measure: (ctx, cell, theme) => {
    //     const { name, message } = cell.data;

    //     ctx.font = `bold 14px ${theme.fontFamily}`;
    //     const nameHeight = measureTextCached(name, ctx).emHeightAscent * 2;

    //     ctx.font = `normal 12px ${theme.fontFamily}`;
    //     const maxWidth = 300; 
    //     const messageLines = wrapText(ctx, message, maxWidth);
    //     const messageHeight = messageLines.length * 14; 

    //     const padding = 10;
    //     return nameHeight + messageHeight + padding;
    // }

};

export default UserMessageCellRenderer;

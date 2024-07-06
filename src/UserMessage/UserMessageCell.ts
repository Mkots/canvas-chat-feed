import { CustomCell, GridCellKind, TextCell } from "@glideapps/glide-data-grid";

export interface UserMessageCellProps {
    readonly kind: "user_message";
    readonly name: string;
    readonly message: string;
}

export type UserMessageCell = CustomCell<UserMessageCellProps>;



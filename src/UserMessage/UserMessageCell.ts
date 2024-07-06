import { CustomCell } from "@glideapps/glide-data-grid";

export interface UserMessageCellProps {
    readonly kind: "user_message";
    readonly name: string;
    readonly message: string;
    displayData: string;
    allowWrapping: boolean;
}

export type UserMessageCell = CustomCell<UserMessageCellProps>;



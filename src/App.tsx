import {
  DataEditor,
  GridCellKind,
  GridColumn,
  Item,
  measureTextCached,
} from "@glideapps/glide-data-grid";
import { faker } from "@faker-js/faker";
import "@glideapps/glide-data-grid/dist/index.css";
import { BeautifulWrapper } from "./BeautifulWrapper";
import UserMessageCellRenderer, {
  wrapText,
} from "./UserMessage/UserMessageCellRenderer";
import { UserMessageCell } from "./UserMessage/UserMessageCell";

const WIDTH = 210;

const columns: GridColumn[] = [{ title: "Message", width: WIDTH }];

type Person = {
  firstName: string;
  lastName: string;
  message: string;
};

const data: Array<Person> = Array.from({ length: 10 }, () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  message: faker.lorem.sentence(),
}));

function getData([col, row]: Item): UserMessageCell {
  const person = data[row];

  if (col === 0) {
    return {
      kind: GridCellKind.Custom,
      data: {
        kind: "user_message",
        name: `${person?.firstName} ${person?.lastName}`,
        message: person?.message ? person.message : "No message",
      },
      allowOverlay: false,
      copyData: `${person?.firstName} ${person?.lastName} ${person?.message}`,
    };
  } else {
    throw new Error();
  }
}

const getRowHeight = (row: number) => {
  const cell = getData([0, row]) as UserMessageCell;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `bold 14px Arial`;
    const nameHeight =
      measureTextCached(cell.data.name, ctx).emHeightAscent * 2;

    ctx.font = `normal 12px Arial`;
    const maxWidth = WIDTH;
    const messageLines = wrapText(ctx, cell.data.message, maxWidth);
    const messageHeight = (messageLines.length + 1) * 24; // Line height

    const padding = 10;
    return nameHeight + messageHeight + padding;
  }
  return 40;
};

const App = () => {
  const numRows = data.length;

  return (
    <BeautifulWrapper title="Data Grid" description="This is a data grid.">
      <DataEditor
        getCellContent={getData}
        columns={columns}
        rows={numRows}
        customRenderers={[UserMessageCellRenderer]}
        rowHeight={getRowHeight}
        getCellsForSelection={true} 
      />
    </BeautifulWrapper>
  );
};

export default App;

import {
  DataEditor,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { faker } from "@faker-js/faker";
import "@glideapps/glide-data-grid/dist/index.css";
import { BeautifulWrapper } from "./BeautifulWrapper";
import UserMessageCellRenderer from "./UserMessage/UserMessageCellRenderer";
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
        displayData: `${person?.firstName} ${person?.lastName}
        ${person?.message}`,
        allowWrapping: true,
      },
      allowOverlay: false,
      copyData: `${person?.firstName} ${person?.lastName} ${person?.message}`,
    };
  } else {
    throw new Error();
  }
}


const App = () => {
  const numRows = data.length;

  return (
    <BeautifulWrapper title="Data Grid" description="This is a data grid.">
      <DataEditor
        getCellContent={getData}
        columns={columns}
        rows={numRows}
        customRenderers={[UserMessageCellRenderer]}
        getCellsForSelection={true}
        rowHeight={(n) => 100}
      />
    </BeautifulWrapper>
  );
};

export default App;

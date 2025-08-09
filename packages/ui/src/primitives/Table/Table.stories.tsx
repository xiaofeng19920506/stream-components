import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

type Row = { name: string; role: string };

const meta: Meta<typeof Table<Row>> = {
  title: "Primitives/Table",
  component: Table<Row>,
};

export default meta;
type Story = StoryObj<typeof Table<Row>>;

export const Default: Story = {
  args: {
    columns: [
      { header: "Name", accessor: "name", sortable: true },
      { header: "Role", accessor: "role", sortable: true },
    ],
    data: [
      { name: "Alice", role: "Admin" },
      { name: "Bob", role: "User" },
      { name: "Carol", role: "Editor" },
    ],
    initialSortBy: { index: 0, direction: "asc" },
  },
};


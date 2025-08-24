import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

type Row = { name: string; role: string };

const meta: Meta<typeof Table<Row>> = {
  title: 'Primitives/Table',
  component: Table<Row>,
};

export default meta;
type Story = StoryObj<typeof Table<Row>>;

const sampleData = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'User' },
  { name: 'Carol', role: 'Editor' },
  { name: 'David', role: 'Manager' },
  { name: 'Eve', role: 'Developer' },
  { name: 'Frank', role: 'Designer' },
  { name: 'Grace', role: 'Tester' },
  { name: 'Henry', role: 'Analyst' },
  { name: 'Ivy', role: 'Support' },
  { name: 'Jack', role: 'Lead' },
];

export const Default: Story = {
  args: {
    columns: [
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Role', accessor: 'role', sortable: true },
    ],
    data: sampleData,
    initialSortBy: { index: 0, direction: 'asc' },
  },
};

export const WithRowClick: Story = {
  args: {
    columns: [
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Role', accessor: 'role', sortable: true },
    ],
    data: sampleData,
    initialSortBy: { index: 0, direction: 'asc' },
    onRowClick: (row, rowIndex) => {
      console.log(`Clicked row ${rowIndex}:`, row);
      alert(`Clicked on ${row.name} (${row.role}) at index ${rowIndex}`);
    },
  },
};

export const WithoutPageSizeSelector: Story = {
  args: {
    columns: [
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Role', accessor: 'role', sortable: true },
    ],
    data: sampleData,
    initialSortBy: { index: 0, direction: 'asc' },
    showPageSizeSelector: false,
  },
};

export const CustomPageSizeOptions: Story = {
  args: {
    columns: [
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Role', accessor: 'role', sortable: true },
    ],
    data: sampleData,
    initialSortBy: { index: 0, direction: 'asc' },
    pageSizeOptions: [3, 5, 10, 15],
    initialPageSize: 3,
  },
};

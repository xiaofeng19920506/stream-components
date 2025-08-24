import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Primitives/TextInput',
  component: TextInput,
  args: {
    label: 'Label',
    placeholder: 'Type...',
    helperText: 'Helper',
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};
export const Error: Story = { args: { error: 'Required' } };

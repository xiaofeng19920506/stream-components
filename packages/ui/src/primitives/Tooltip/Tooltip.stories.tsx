import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Primitives/Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const HoverTop: Story = {
  args: {
    content: "Tooltip",
    children: <button>Hover me</button>,
    placement: "top",
  },
};

export const ClickRight: Story = {
  args: {
    content: "Tooltip",
    children: <button>Click me</button>,
    placement: "right",
    trigger: "click",
  },
};


import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Primitives/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          footer={<Button onClick={() => setOpen(false)}>Close</Button>}
        >
          Content here
        </Modal>
      </div>
    );
  },
};


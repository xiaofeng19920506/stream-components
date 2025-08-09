import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./ToastProvider";
import { Button } from "../Button/Button";

const meta: Meta = {
  title: "Primitives/Toast",
};

export default meta;

export const Demo: StoryObj = {
  render: () => {
    return (
      <ToastProvider>
        <ToastInner />
      </ToastProvider>
    );
  },
};

function ToastInner() {
  const { notify } = useToast();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button
        onClick={() =>
          notify({ title: "Saved", message: "Changes saved", kind: "success" })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          notify({ title: "Warning", message: "Be careful", kind: "warning" })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          notify({
            title: "Error",
            message: "Something went wrong",
            kind: "error",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}


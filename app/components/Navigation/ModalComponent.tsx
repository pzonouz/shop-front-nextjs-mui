"use client";

import { JSXElementConstructor, ReactElement } from "react";
import { Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ModalComponent = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: Function;
  children: ReactElement<unknown, string | JSXElementConstructor<any>>;
}) => {
  return (
    <div>
      <Fab
        onClick={() => {
          setOpen(true);
        }}
        sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
};
export { ModalComponent };

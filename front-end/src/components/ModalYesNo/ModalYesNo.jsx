// ModalYesNo.js
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ModalYesNo = ({ open, title, description, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Non
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalYesNo;

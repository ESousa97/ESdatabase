import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const Dialog = ({ open, onClose, onConfirm }) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">Deseja sair?</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Você será desconectado da sua conta.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;

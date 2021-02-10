import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function AlertBox({ open, handleClose, error }) {

    return (
      <div>
         <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Something went wrong"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={'span'}>
            Check the error details:<br />
            <pre>{JSON.stringify(error, null, 3)}</pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}
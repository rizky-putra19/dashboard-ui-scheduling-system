import React, { FunctionComponent } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

interface Prop {
  open: boolean;
  onClose: () => void;
  onYes: () => void;
  loading?: boolean;
}
const PublishDialog: FunctionComponent<Prop> = ({ open, onClose, onYes, loading = false }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      <DialogTitle id="alert-dialog-title">
        Publish Shift
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to publish selected shift?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        { loading ? <CircularProgress style={{ marginBottom: 10, marginRight: 10 }} /> : (
          <div>
            <Button onClick={() => onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => onYes()} color="primary" autoFocus>
              Yes
            </Button>
          </div>
        ) }
      </DialogActions>
    </Dialog>
  );
};

export default PublishDialog;

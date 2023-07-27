import { Button} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import {
  ArchivedChatroomsListDocument,
  ChatroomsListDocument,
  useEditChatroomMutation,
} from "~src/codegen/graphql";

export type ArchiveChatroomButtonProps = {
  id: string;
};

type ArchiveChatroomState = {
  id: string;
  resolved: boolean;
}

export const ArchiveChatroomButton: React.FC<ArchiveChatroomButtonProps> = ({
  id,
}) => {
  const [open, setOpen] = useState(false);

  const [editChatroom] = useEditChatroomMutation({
    refetchQueries: [{ query: ChatroomsListDocument }, { query: ArchivedChatroomsListDocument }],
  });

  const handleSubmit: (values: ArchiveChatroomState) => Promise<void> = async (
    variables
  ) => {
    editChatroom({ variables });
  };

  const handleClose = () => setOpen(false)

  return (
    <div>
    <Button
      size="small"
      variant="contained"
      onClick={() => setOpen(true)}
    >
      Archive
    </Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirm Archival</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please confirm you want to archive this chatroom permanently!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={() => handleSubmit({id: id, resolved: true})}>Confirm</Button>
    </DialogActions>
  </Dialog>
  </div>
  );
};

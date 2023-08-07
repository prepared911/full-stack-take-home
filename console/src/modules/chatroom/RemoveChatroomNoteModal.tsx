import * as React from "react";
import { Box, Card, Modal, Typography, Alert } from "@mui/material";
import {
  ChatroomNotesListDocument,
  useDeleteChatroomNoteMutation
} from "~src/codegen/graphql";

import { RemoveChatroomNoteForm, RemoveChatroomNoteFormProps } from "./RemoveChatroomNoteForm";

export type EditChatroomModalProps = {
  open: boolean;
  id: string;
  handleClose: () => void;
};

export const RemoveChatroomNoteModal: React.FC<EditChatroomModalProps> = ({
  open,
  id,
  handleClose,
}) => {
    const [deleteChatroomNoteMutation, { error }] = useDeleteChatroomNoteMutation({ 
        refetchQueries: [ChatroomNotesListDocument],
        variables: { id } 
    });

  if (error) {
    return (
      <Alert severity="error">
        <Typography>Something went wrong.</Typography>
        {error?.message && <Typography>{error.message}</Typography>}
      </Alert>
    )
  }

  const handleSubmit: RemoveChatroomNoteFormProps["onSubmit"] = async () => {
    deleteChatroomNoteMutation()
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ inset: 0 }}
      >
        <Card variant="outlined" sx={{ minWidth: 400, padding: 2 }}>
          <RemoveChatroomNoteForm 
            onSubmit={handleSubmit}
            handleClose={handleClose} />
        </Card>
      </Box>
    </Modal>
  );
};

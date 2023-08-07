import * as React from "react";
import { Box, Card, Modal, Alert, Typography } from "@mui/material";
import {
  ChatroomNotesListDocument,
  useCreateChatroomNoteMutation,
} from "~src/codegen/graphql";
import {
  CreateChatroomNoteForm,
  CreateChatroomNoteFormProps,
} from "./CreateChatroomNoteForm";

export type CreateChatroomNoteModalProps = {
  open: boolean;
  chatroomId: string;
  handleClose: () => void;
};

export const CreateChatroomNoteModal: React.FC<CreateChatroomNoteModalProps> = ({
  open,
  chatroomId,
  handleClose,
}) => {
  const [chatroomNoteVariables, setChatroomNoteVariables] = React.useState({ note: "", chatroomId });
  const [createChatroomNote, { error }] = useCreateChatroomNoteMutation({
    refetchQueries: [ChatroomNotesListDocument],
    variables: chatroomNoteVariables
  });

  React.useEffect(() => {
    if (open) createChatroomNote();
  }, [chatroomNoteVariables]);

  if (error) {
    return (
      <Alert severity="error">
        <Typography>Something went wrong.</Typography>
        {error?.message && <Typography>{error.message}</Typography>}
      </Alert>
    )
  };

  const handleSubmit: CreateChatroomNoteFormProps["onSubmit"] = async (
    variables
  ) => {
    setChatroomNoteVariables({...variables, chatroomId })
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
          {open && (
            <CreateChatroomNoteForm
              onSubmit={handleSubmit}
              handleClose={handleClose}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};

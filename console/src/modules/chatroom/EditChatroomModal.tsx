import * as React from "react";
import { Box, Card, Modal } from "@mui/material";
import {
  ChatroomsListDocument,
  useEditChatroomMutation,
  EditChatroomMutationVariables
} from "~src/codegen/graphql";

import {
  EditChatroomForm,
  EditChatroomFormProps,
} from "./EditChatroomForm";

import { ResolveChatroomForm } from "./ResolveChatroomForm";


export type EditChatroomModalProps = {
  open: boolean;
  defaultValues: EditChatroomMutationVariables;
  shouldResolve: boolean;
  handleClose: () => void;
};

export const EditChatroomModal: React.FC<EditChatroomModalProps> = ({
  open,
  defaultValues,
  shouldResolve,
  handleClose,
}) => {
  const { chatroomId, description } = defaultValues;
  const [newValues, setNewValues] = React.useState(defaultValues)
  const [EditChatroom] = useEditChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
    variables: newValues
  });

  React.useEffect(() => {
    if (open) EditChatroom();
  }, [newValues])

  const handleSubmit: EditChatroomFormProps["onSubmit"] = async (variables) => {
    setNewValues({...variables, chatroomId})
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
          {open && !shouldResolve && (
            <EditChatroomForm
              onSubmit={handleSubmit}
              handleClose={handleClose}
              defaultValues={defaultValues}
            />
          )}
          {open && shouldResolve &&(
            <ResolveChatroomForm
            onSubmit={handleSubmit}
            handleClose={handleClose}
          />
          )}
        </Card>
      </Box>
    </Modal>
  );
};
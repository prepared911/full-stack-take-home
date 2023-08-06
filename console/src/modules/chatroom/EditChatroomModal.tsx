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


export type EditChatroomModalProps = {
  open: boolean;
  defaultValues: EditChatroomMutationVariables;
  handleClose: () => void;
};

export const EditChatroomModal: React.FC<EditChatroomModalProps> = ({
  open,
  defaultValues,
  handleClose,
}) => {
  const { chatroomId, description } = defaultValues;
  const [newValues, setNewValues] = React.useState(defaultValues)
  const [EditChatroom] = useEditChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
    variables: newValues
  });

  React.useEffect(() => {
    if (open===true) EditChatroom();
  }, [newValues])

  const handleSubmit: EditChatroomFormProps["onSubmit"] = async (variables) => {
    setNewValues({description: variables.description || "", chatroomId})
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
            <EditChatroomForm
              onSubmit={handleSubmit}
              handleClose={handleClose}
              defaultValues={defaultValues}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};
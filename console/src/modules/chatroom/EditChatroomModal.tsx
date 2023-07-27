import { Box, Card, Modal } from "@mui/material";
import {
  ChatroomsListDocument,
  useEditChatroomMutation,
} from "~src/codegen/graphql";
import {
  EditChatroomForm,
  EditChatroomFormProps,
} from "./EditChatroomForm";
import { ChatroomDataFragment } from "~src/codegen/graphql";

export type EditChatroomModalProps = {
  chatroom: ChatroomDataFragment;
  open: boolean;
  handleClose: () => void;
};

export const EditChatroomModal: React.FC<EditChatroomModalProps> = ({
  chatroom,
  open,
  handleClose,
}) => {
  const [editChatroom] = useEditChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
  });

  const handleSubmit: EditChatroomFormProps["onSubmit"] = async (
    variables
  ) => {
    editChatroom({ variables });
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
              chatroom={chatroom}
              onSubmit={handleSubmit}
              handleClose={handleClose}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};

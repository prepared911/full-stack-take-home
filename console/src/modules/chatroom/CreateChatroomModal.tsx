import { Box, Card, Modal } from "@mui/material";
import {
  ChatroomDataFragmentDoc,
  useCreateChatroomMutation,
} from "~src/codegen/graphql";
import {
  CreateChatroomForm,
  CreateChatroomFormProps,
} from "./CreateChatroomForm";

export type CreateChatroomModalProps = {
  open: boolean;
  handleClose: () => void;
};

export const CreateChatroomModal: React.FC<CreateChatroomModalProps> = ({
  open,
  handleClose,
}) => {
  const [createChatroom] = useCreateChatroomMutation({
    update(cache, { data }) {
      const chatroom = data?.createChatroom?.chatroom;
      if (!chatroom) return;

      cache.modify({
        fields: {
          chatrooms(existingChatrooms = []) {
            const newChatroomRef = cache.writeFragment({
              data: chatroom,
              fragment: ChatroomDataFragmentDoc,
              fragmentName: "ChatroomData",
            });
            return [newChatroomRef, ...existingChatrooms];
          },
        },
      });
    },
  });

  const handleSubmit: CreateChatroomFormProps["onSubmit"] = async (
    variables
  ) => {
    createChatroom({ variables });
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
            <CreateChatroomForm
              onSubmit={handleSubmit}
              handleClose={handleClose}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};

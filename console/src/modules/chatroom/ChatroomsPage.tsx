import { AddComment } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import {
  useChatroomsListQuery,
  useNatureCodesQuery,
} from "~src/codegen/graphql";
import { ChatroomsList } from "./ChatroomsList";
import { CreateChatroomModal } from "./CreateChatroomModal";

export const ChatroomsPage: React.FC = () => {
  const chatroomsListQuery = useChatroomsListQuery();
  const natureCodesQuery = useNatureCodesQuery();

  const [showCreateChatroomModal, setShowCreateChatroomModal] = useState(false);

  const chatrooms = chatroomsListQuery?.data?.chatrooms ?? [];
  const natureCodes = natureCodesQuery?.data?.natureCodes ?? [];

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h5">Chatrooms</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddComment />}
          onClick={() => setShowCreateChatroomModal(true)}
        >
          New Chatroom
        </Button>
      </Box>
      <ChatroomsList
        loading={chatroomsListQuery.loading || natureCodesQuery.loading}
        chatrooms={chatrooms}
        natureCodes={natureCodes}
      />
      <CreateChatroomModal
        open={showCreateChatroomModal}
        handleClose={() => setShowCreateChatroomModal(false)}
      />
    </Container>
  );
};

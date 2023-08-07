import * as React from "react";
import {
  Box,
  Card,
  CardProps,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomNoteDataFragment, useDeleteChatroomNoteMutation } from "~src/codegen/graphql";

import { formatDateTime } from "../utils/formatDateTime";

const ChatroomNoteCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomNoteListItemProps = {
  chatroomNote: ChatroomNoteDataFragment;
};

export const ChatroomNoteListItem: React.FC<ChatroomNoteListItemProps> = ({
  chatroomNote,
}) => {
  const [showRemoveChatroomNoteModal, setShowRemoveChatroomNoteModal] = useState(false);
  const [deleteChatroomNoteMutation, { error }] = useDeleteChatroomNoteMutation({ variables: { id: chatroomNote.id } });

  return (
    <Container>
      <ChatroomNoteCard variant="outlined">
      <Typography variant="body1">{`Created at: ${formatDateTime(chatroomNote.createdAt)}`}</Typography>
      <Box
        display="flex"
        alignItems="flex-start"
      >
        <Typography variant="body2">{chatroomNote?.note}</Typography>
      </Box>
    </ChatroomNoteCard>
    {/* <CreateChatroomNoteModal open={showAddChatroomNoteModal} chatroomId={chatroom?.id} handleClose={() => setShowAddChatroomNoteModal(false)} /> */}
    </Container>
  );
};

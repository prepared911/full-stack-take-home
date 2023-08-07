import * as React from "react";
import {
  Box,
  Card,
  CardProps,
  Typography,
  Container,
  Button,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomNoteDataFragment } from "~src/codegen/graphql";

import { formatDateTime } from "../utils/formatDateTime";

import { RemoveChatroomNoteModal } from "./RemoveChatroomNoteModal";

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

  return (
    <Container>
      <ChatroomNoteCard variant="outlined">
        <Box display={"inline-flex"} justifyContent={"space-between"}>
            <Typography variant="body1">{`Created at: ${formatDateTime(chatroomNote.createdAt)}`}</Typography>
            <Button color="primary" variant="outlined" onClick={() => setShowRemoveChatroomNoteModal(true)}>Delete note</Button>
        </Box>
      <Box
        display="flex"
        alignItems="flex-start"
      >
        <Typography variant="body2">{chatroomNote?.note}</Typography>
      </Box>
    </ChatroomNoteCard>
    <RemoveChatroomNoteModal open={showRemoveChatroomNoteModal} id={chatroomNote?.id} handleClose={() => setShowRemoveChatroomNoteModal(false)} />
    </Container>
  );
};

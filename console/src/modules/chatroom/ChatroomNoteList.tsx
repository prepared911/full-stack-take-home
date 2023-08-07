import * as React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { ChatroomNote } from "~src/codegen/graphql";

import { ChatroomNoteListItem } from "./ChatroomNoteListItem";

export type ChatroomsNoteListProps = {
  loading?: boolean;
  chatroomNotes?: ChatroomNote[] | undefined;
};

export const ChatroomNotesList: React.FC<ChatroomsNoteListProps> = ({
  loading,
  chatroomNotes,
}) => {
  
  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {chatroomNotes && chatroomNotes.length === 0 && (
        <Typography variant="body2">
          No chatroom notes.
        </Typography>
      )}
      {chatroomNotes && chatroomNotes.map((chatroomNote) => (
        <ChatroomNoteListItem key={chatroomNote.id} chatroomNote={chatroomNote} />
      ))}
    </Box>
  );
};

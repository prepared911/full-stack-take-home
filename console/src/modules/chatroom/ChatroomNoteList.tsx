import { useState } from "react";
import { Alert, Box, CircularProgress, Button } from "@mui/material";
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
    <Box display="flex" flexDirection="row" gap={1}>
      {chatroomNotes && chatroomNotes.length === 0 && (
        <Alert severity="info" variant="outlined">
          No chatroom notes.
        </Alert>
      )}
      {chatroomNotes && chatroomNotes.map((chatroomNote) => (
        <ChatroomNoteListItem key={chatroomNote.id} chatroomNote={chatroomNote} />
      ))}
    </Box>
  );
};

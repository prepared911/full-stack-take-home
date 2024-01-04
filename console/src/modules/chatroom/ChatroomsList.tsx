import { Alert, Box, CircularProgress } from "@mui/material";
import {
  ChatroomDataFragment,
  NatureCodeDataFragment,
} from "~src/codegen/graphql";

import { ChatroomListItem } from "./ChatroomListItem";

export type ChatroomsListProps = {
  loading?: boolean;
  chatrooms: ChatroomDataFragment[];
  natureCodes: NatureCodeDataFragment[];
};

export const ChatroomsList: React.FC<ChatroomsListProps> = ({
  loading,
  chatrooms,
  natureCodes,
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
      {chatrooms.length === 0 && (
        <Alert severity="info" variant="outlined">
          No chatrooms.
        </Alert>
      )}
      {chatrooms.map((chatroom) => (
        <ChatroomListItem
          key={chatroom.id}
          chatroom={chatroom}
          natureCodes={natureCodes}
        />
      ))}
    </Box>
  );
};

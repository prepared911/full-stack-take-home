import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Typography,
  Container,
  styled,
} from "@mui/material";

import { ChatroomNoteDataFragment } from "~src/codegen/graphql";

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
    </Container>
  );
};

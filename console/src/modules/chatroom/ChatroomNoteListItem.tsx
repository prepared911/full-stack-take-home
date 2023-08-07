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

const ChatroomNoteCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
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
      <Box
        display="flex"
        alignItems="flex-start"
      >
        <Box>
            <Typography variant="h8">{chatroomNote?.note}</Typography>
        </Box>
      </Box>
    </ChatroomNoteCard>
    </Container>
  );
};

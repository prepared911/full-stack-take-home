import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

import {
  ChatroomDataFragment,
  NatureCodeDataFragment,
} from "~src/codegen/graphql";
import { ChatroomListItemActions } from "./ChatroomListItemActions";
import { ChatroomTags } from "./ChatroomTags";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
  natureCodes: NatureCodeDataFragment[];
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
  natureCodes,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  return (
    <ChatroomCard variant="outlined">
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h6">{chatroom.label}</Typography>
          <ChatroomTags
            natureCode={natureCodeName}
            callerPhoneNumber={chatroom.callerPhoneNumber}
          />
        </Box>
        <IconButton onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={showDetails}>
        <Card sx={{ padding: 2 }}>
          <Stack direction="row" spacing={1}>
            <Box flex={1}>
              <Typography variant="body1">Description</Typography>
              <Typography variant="body2">
                {chatroom.description ?? "No description provided."}
              </Typography>
            </Box>
            <ChatroomListItemActions
              chatroom={chatroom}
              natureCodes={natureCodes}
            />
          </Stack>
        </Card>
      </Collapse>
    </ChatroomCard>
  );
};

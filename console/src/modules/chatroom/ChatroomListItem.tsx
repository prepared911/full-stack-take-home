import {
  CheckCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  ChatroomDataFragment,
  ChatroomsListDocument,
  useUpdateChatroomMutation,
} from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

type EditableDescriptionProps = {
  chatroom: ChatroomDataFragment;
};

const EditableDescription: React.FC<EditableDescriptionProps> = ({
  chatroom,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(() => chatroom.description);

  const [updateChatroom] = useUpdateChatroomMutation({
    variables: { id: chatroom.id, description },
  });

  useEffect(() => {
    setDescription(chatroom.description);
  }, [chatroom.description]);

  const saveDescription = async () => {
    await updateChatroom();
    setIsEditing(false);
  };

  return (
    <Card sx={{ padding: 2 }}>
      <Typography variant="body1">Description</Typography>
      {isEditing ? (
        <>
          <TextField
            size="small"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            sx={{ marginBottom: 1 }}
            maxRows={4}
            multiline
            fullWidth
          />
          <Stack spacing={1} direction="row" justifyContent="flex-end">
            <Button variant="text" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={saveDescription}>
              Save
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="body2">
            {chatroom.description ?? "No description provided."}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="text" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
};

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const [resolveChatroom] = useUpdateChatroomMutation({
    variables: { id: chatroom.id, resolved: true },
    refetchQueries: [ChatroomsListDocument],
  });

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
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => resolveChatroom()}>
            <CheckCircle />
          </IconButton>
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Stack>
      </Box>
      <Collapse in={showDetails}>
        <EditableDescription chatroom={chatroom} />
      </Collapse>
    </ChatroomCard>
  );
};

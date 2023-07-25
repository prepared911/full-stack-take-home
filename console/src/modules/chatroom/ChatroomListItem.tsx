import { AddComment, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, ChatroomsListDocument, useResolveChatroomMutation} from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const [resolveChatroom] = useResolveChatroomMutation({
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
        <Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              const confirmBox = window.confirm(
                "Do you really want to resolve this chatroom?"
              )
              if (confirmBox === true) {
                console.log("should resolve id " + chatroom.id )
                resolveChatroom({ variables: { id: chatroom.id } })
              } else {
                console.log("declined to resolve id " + chatroom.id)
              }
            }}
          >
            Resolve
          </Button>
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={showDetails}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2">
            {chatroom.description ?? "No description provided."}
          </Typography>
          <Button
            size="small"
            variant="text"
            startIcon={<Edit />}
            //onClick={() => setShowResolveChatroomModal(true)}
          >
            Edit
          </Button>
        </Card>
      </Collapse>
    </ChatroomCard>
  );
};

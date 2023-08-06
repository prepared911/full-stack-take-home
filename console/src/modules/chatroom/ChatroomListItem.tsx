import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Button,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, useEditChatroomMutation } from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";
import { EditChatroomModal } from "./EditChatroomModal";

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
  const [showEditChatroomModal, setShowEditChatroomModal] = useState(false);
  const [showResolvedIncidentModal, setShowResolvedIncidentModal] = useState(false);

  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  return (
    <Container>
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
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2">
            {chatroom.description ?? "No description provided."}
          </Typography>
        </Card>
        <Box display={"flex"} justifyContent={"flex-end"} sx={{margin: "15px 0px"}}>
          <Button variant="text" color="primary" onClick={() => setShowEditChatroomModal(true)} style={{float: "left"}} >Edit</Button>
          <Button variant="contained" color="primary" onClick={() => setShowResolvedIncidentModal(true)} style={{float: "right"}} >Resolve</Button>
        </Box>
      </Collapse>
    </ChatroomCard>
    <EditChatroomModal
    open={showEditChatroomModal || showResolvedIncidentModal}
    defaultValues={{chatroomId: chatroom?.id, description: chatroom?.description}}
    handleClose={() => showResolvedIncidentModal ? setShowResolvedIncidentModal(false) : setShowEditChatroomModal(false)}
    shouldResolve={showResolvedIncidentModal}
    />
    </Container>
  );
};

import {
    Box,
    Card,
    Button,
    Typography,
    Container,
  } from "@mui/material";
  import { useState } from "react";

import { ChatroomListItemProps } from "./ChatroomListItem";
import { EditChatroomModal } from "./EditChatroomModal";

export const ChatroomDescription: React.FC<ChatroomListItemProps> = ({ chatroom }) => {
    const [showEditChatroomModal, setShowEditChatroomModal] = useState(false);
    const [showResolvedIncidentModal, setShowResolvedIncidentModal] = useState(false);

  return (
    <Container>
       <Card sx={{ padding: 2 }}>
        <Typography variant="body1">Description</Typography>
        <Typography variant="body2">
            {chatroom.description ?? "No description provided."}
        </Typography>
       </Card>
       <Box display={"flex"} justifyContent={"flex-end"} sx={{margin: "15px 0px"}}>
          <Button variant="text" color="primary" onClick={() => setShowEditChatroomModal(true)} style={{float: "left"}} >Edit</Button>
          {!chatroom?.resolved && (
            <Button variant="contained" color="primary" onClick={() => setShowResolvedIncidentModal(true)} style={{float: "right"}} >Resolve</Button>
          )}
        </Box>
        <EditChatroomModal
        open={showEditChatroomModal || showResolvedIncidentModal}
        defaultValues={{chatroomId: chatroom?.id, description: chatroom?.description}}
        handleClose={() => showResolvedIncidentModal ? setShowResolvedIncidentModal(false) : setShowEditChatroomModal(false)}
        shouldResolve={showResolvedIncidentModal}
        />
    </Container>
  )
}

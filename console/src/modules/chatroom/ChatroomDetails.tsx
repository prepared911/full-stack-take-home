import {
    Box,
    Card,
    Button,
    Typography,
    Container,
  } from "@mui/material";
  import { useState } from "react";

import { useChatroomNotesListQuery } from "~src/codegen/graphql";
import { ChatroomListItemProps } from "./ChatroomListItem";
import { ChatroomNotesList } from "./ChatroomNoteList";
import { CreateChatroomNoteModal } from "./CreateChatroomNoteModal";

export const ChatroomDetails: React.FC<ChatroomListItemProps> = ({ chatroom }) => {
  const [showAddChatroomNoteModal, setShowAddChatroomNoteModal] = useState(false);
  const { data, loading } = useChatroomNotesListQuery({ variables: { chatroomId: chatroom.id } });

  return (
    <Container>
        <Card sx={{ padding: 2 }}>
            <Typography variant="body1">Notes</Typography>
            <ChatroomNotesList loading={loading} chatroomNotes={data?.chatroomNotes} />
        </Card>
        <Box display={"flex"} justifyContent={"flex-end"} sx={{margin: "15px 0px"}}>
            <Button variant="contained" color="primary" onClick={() => setShowAddChatroomNoteModal(true)} style={{float: "right"}}>Create Note</Button>
        </Box>
        <CreateChatroomNoteModal open={showAddChatroomNoteModal} chatroomId={chatroom?.id} handleClose={() => setShowAddChatroomNoteModal(false)} />
    </Container>
  )
} 
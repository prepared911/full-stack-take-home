import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Button,
  Tabs,
  Tab,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, useChatroomNotesListQuery } from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";
import { EditChatroomModal } from "./EditChatroomModal";
import { ChatroomTabPanel } from "./ChatroomTabPanel";
import { ChatroomNotesList } from "./ChatroomNoteList";
import { CreateChatroomNoteModal } from "./CreateChatroomNoteModal";
import { ChatroomDetails } from "./ChatroomDetails";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
};

function a11yProps(index: number) {
  return {
    id: `chatroom-tab-${index}`,
    'aria-controls': `chatroom-tab-${index}`,
  };
}

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [tabValue, setTabValue] = useState("description");
  const [showEditChatroomModal, setShowEditChatroomModal] = useState(false);
  const [showResolvedIncidentModal, setShowResolvedIncidentModal] = useState(false);

  const [showAddChatroomNoteModal, setShowAddChatroomNoteModal] = useState(false);
  const { data, loading } = useChatroomNotesListQuery({ variables: { chatroomId: chatroom.id } })

  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  }

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
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab value={"description"} label="Description" tabIndex={0} {...a11yProps(0)}  />
            <Tab value={"notes"} label="Notes" tabIndex={1} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <ChatroomTabPanel value={tabValue} index={0} >
          <Card sx={{ padding: 2 }}>
            <Typography variant="body1">Description</Typography>
            <Typography variant="body2">
              {chatroom.description ?? "No description provided."}
            </Typography>
          </Card>
          {!chatroom?.resolved && (
          <Box display={"flex"} justifyContent={"flex-end"} sx={{margin: "15px 0px"}}>
            <Button variant="text" color="primary" onClick={() => setShowEditChatroomModal(true)} style={{float: "left"}} >Edit</Button>
            <Button variant="contained" color="primary" onClick={() => setShowResolvedIncidentModal(true)} style={{float: "right"}} >Resolve</Button>
          </Box>
          )}
        </ChatroomTabPanel>
        <ChatroomTabPanel value={tabValue} index={1}>
            <ChatroomDetails chatroom={chatroom} />
        </ChatroomTabPanel>
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

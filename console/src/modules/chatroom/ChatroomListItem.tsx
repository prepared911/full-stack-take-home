import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Tabs,
  Tab,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment } from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";
import { ChatroomTabPanel } from "./ChatroomTabPanel";
import { ChatroomDetails } from "./ChatroomDetails";
import { ChatroomDescription } from "./ChatroomDescription";

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
          <ChatroomDescription chatroom={chatroom} />
        </ChatroomTabPanel>
        <ChatroomTabPanel value={tabValue} index={1}>
          <ChatroomDetails chatroom={chatroom} />
        </ChatroomTabPanel>
      </Collapse>
    </ChatroomCard>
    </Container>
  );
};

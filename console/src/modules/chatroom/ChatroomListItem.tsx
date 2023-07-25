import { AddComment, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardProps,
  Collapse,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, ArchivedChatroomsListDocument, ChatroomsListDocument, useResolveChatroomMutation, useUpdateChatroomDescriptionMutation} from "~src/codegen/graphql";
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
  const [editDetails, setEditDetails] = useState(false);
  const [description, setDescription] = useState(chatroom.description);

  const [descriptionFormText, setDescriptionFormText] = useState(chatroom.description);

  const [resolveChatroom] = useResolveChatroomMutation({
    refetchQueries: [ChatroomsListDocument, ArchivedChatroomsListDocument], // TODO(awu): this needs to update the archived list as well
  });

  const [updateChatroomDescription] = useUpdateChatroomDescriptionMutation();

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const description = event.target.value;
    setDescriptionFormText( description );
  };

  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  const EditButton = (
      <Button
      size="small"
      variant="text"
      startIcon={<Edit />}
      onClick={() => setEditDetails(true)}
    >
      Edit
    </Button>
  );

  const DescriptionText = (<Typography variant="body2">
    {description ?? "No description provided."}
    </Typography>
  );

  const DescriptionInputBox = (<TextField
      size="small"
      name="description"
      value={descriptionFormText}
      multiline
      onChange={handleTextChange}
      autoFocus
    />);

  const SaveButtonHandler = () => {
    setEditDetails(false);
    setDescription(descriptionFormText);
    updateChatroomDescription({variables: { id: chatroom.id, description: descriptionFormText || '' } });
  };

  const CancelButtonHandler = () => {
    setEditDetails(false);
    setDescriptionFormText(description);
  };

  const ResolveButton = () => {
    if (!chatroom.resolved) {
      return <Button
        size="small"
        variant="outlined"
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to resolve this chatroom?"
          )
          if (confirmBox === true) {
            resolveChatroom({ variables: { id: chatroom.id } })
          }
        }}
      >
        Resolve
      </Button>
    } else {
      return <></>
    }
  }

  const CancelAndSaveButtons = (<>
    <Button
      size="small"
      variant="text"
      onClick={SaveButtonHandler}
    >
      Save
    </Button>
    <Button
      size="small"
      variant="text"
      onClick={CancelButtonHandler}
    >
    Cancel
    </Button>
  </>);

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
          {ResolveButton()}
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={showDetails}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="body1">Description</Typography>
          {editDetails ? DescriptionInputBox : DescriptionText}
          {editDetails ? CancelAndSaveButtons : EditButton}
        </Card>
      </Collapse>
    </ChatroomCard>
  );
};

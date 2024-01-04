import {
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  ChatroomDataFragment,
  NatureCodeDataFragment,
  useUpdateChatroomNatureCodeMutation,
} from "~src/codegen/graphql";

const NATURE_CODE_PLACEHOLDER_ID = "placeholder";

export type ChatroomListItemActionsProps = {
  chatroom: ChatroomDataFragment;
  natureCodes: NatureCodeDataFragment[];
};

export const ChatroomListItemActions: React.FC<
  ChatroomListItemActionsProps
> = ({ chatroom, natureCodes }) => {
  const [natureCodeId, setNatureCodeId] = useState<string>(
    () => chatroom.natureCode?.id ?? NATURE_CODE_PLACEHOLDER_ID
  );

  const [updateNatureCode, { loading }] = useUpdateChatroomNatureCodeMutation();

  useEffect(() => {
    if (chatroom.natureCode?.id) {
      setNatureCodeId(chatroom.natureCode.id);
    }
  }, [chatroom.natureCode?.id]);

  const handleNatureCodeChange = (event: SelectChangeEvent<string>) => {
    setNatureCodeId(event.target.value);
    updateNatureCode({
      variables: { id: chatroom.id, natureCodeId: event.target.value },
    });
  };
  return (
    <Stack direction="row" spacing={1}>
      <Select
        size="small"
        value={natureCodeId}
        onChange={handleNatureCodeChange}
        endAdornment={loading ? <CircularProgress /> : null}
        disabled={loading}
      >
        <MenuItem value="placeholder" disabled>
          Select nature code
        </MenuItem>
        {natureCodes.map((natureCode) => (
          <MenuItem key={natureCode.id} value={natureCode.id}>
            {natureCode.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

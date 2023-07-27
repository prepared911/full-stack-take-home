import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ChatroomDataFragment } from "~src/codegen/graphql";

type EditChatroomFormState = {
  id: string;
  description: string;
};

export type EditChatroomFormProps = {
  chatroom: ChatroomDataFragment,
  handleClose: () => void;
  onSubmit: (values: EditChatroomFormState) => Promise<void>;
};

export const EditChatroomForm: React.FC<EditChatroomFormProps> = ({
  chatroom,
  handleClose,
  onSubmit,
}) => {
  const [submitDisabled, setsubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] =
    useState<EditChatroomFormState>({id: chatroom.id, description: chatroom.description || ""});

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.target.name as keyof EditChatroomFormState;
    setValues({ ...values, [name]: event.target.value });
    setsubmitDisabled(false);
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Edit Chatroom Description
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          size="small"
          label="Description"
          name="description"
          value={values.description}
          onChange={handleTextChange}
          rows={4}
          multiline
        />
        <Box display="flex" justifyContent="flex-end" marginTop={4} gap={1}>
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitDisabled}
            startIcon={
              isSubmitting ? (
                <CircularProgress color="inherit" sx={{ fontSize: "1em" }} />
              ) : null
            }
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

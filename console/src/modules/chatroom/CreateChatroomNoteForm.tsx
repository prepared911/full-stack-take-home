import * as React from "react";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  
  type CreateChatroomNoteFormState = {
    note: string;
  };
  
  const defaultFormState = (): CreateChatroomNoteFormState => ({
    note: "",
  });
  
  const isFormValid = (formState: CreateChatroomNoteFormState): boolean => {
    const hasNote = formState.note.length > 0;
  
    return hasNote;
  };
  
  export type CreateChatroomNoteFormProps = {
    handleClose: () => void;
    onSubmit: (values: CreateChatroomNoteFormState) => Promise<void>;
  };
  
  export const CreateChatroomNoteForm: React.FC<CreateChatroomNoteFormProps> = ({
    handleClose,
    onSubmit,
  }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] =
      useState<CreateChatroomNoteFormState>(defaultFormState);
  
    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      setValues({ ...values, [event.target.name]: event.target.value });
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
          Create Chatroom Note
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            size="small"
            label="Note"
            name="note"
            value={values.note}
            onChange={handleTextChange}
            autoFocus
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
              disabled={!isFormValid(values)}
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
  
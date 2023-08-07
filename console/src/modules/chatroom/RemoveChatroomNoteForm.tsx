import * as React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
  } from "@mui/material";
import { useState } from "react";

export type RemoveChatroomNoteFormProps = {
  handleClose: () => void;
  onSubmit: () => Promise<void>;
};

export const RemoveChatroomNoteForm: React.FC<RemoveChatroomNoteFormProps> = ({
  handleClose,
  onSubmit,
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Are you sure you want to delete this note?
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="space-between" marginTop={4} gap={1}>
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
            startIcon={
              isSubmitting ? (
                <CircularProgress color="inherit" sx={{ fontSize: "1em" }} />
              ) : null
            }
          >
            Delete
          </Button>
        </Box>
      </Box>
    </form>
  );
};
  
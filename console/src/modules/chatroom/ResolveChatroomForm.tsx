import {
    Box,
    Button,
    CircularProgress,
    Typography
  } from "@mui/material";
import { useState } from "react";

export type ResolveChatroomFormState = {
  resolved?: boolean | null;
};

export type ResolveChatroomFormProps = {
  handleClose: () => void;
  onSubmit: (values: ResolveChatroomFormState) => Promise<void>;
};

export const ResolveChatroomForm: React.FC<ResolveChatroomFormProps> = ({
  handleClose,
  onSubmit,
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit({resolved: true});
    setIsSubmitting(false);

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Are you sure you want to resolve this incident?
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
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

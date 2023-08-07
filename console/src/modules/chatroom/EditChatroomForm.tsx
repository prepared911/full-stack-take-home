import {
    Box,
    Button,
    CircularProgress,
    SelectChangeEvent,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  
  export type EditChatroomFormState = {
    description?: string | null;
    resolved?: boolean | null;
  };

  const isFormValid = (formState: EditChatroomFormState): boolean => {
    const hasDescription = formState?.description && formState?.description?.length > 0;
    const updatingResolved = formState?.resolved && formState?.resolved === true;
  
    return !!hasDescription || !!updatingResolved;
  };
  
  export type EditChatroomFormProps = {
    defaultValues: EditChatroomFormState;
    handleClose: () => void;
    onSubmit: (values: EditChatroomFormState) => Promise<void>;
  };
  
  export const EditChatroomForm: React.FC<EditChatroomFormProps> = ({
    defaultValues,
    handleClose,
    onSubmit,
  }) => {
  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] =
      useState<EditChatroomFormState>({description: defaultValues?.description || ""});
  
    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      const value = event.target.value;
  
      setValues({ description: value });
    };
  
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
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
            value={values.description || ""}
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
  
import { Card, Typography } from "@mui/material";

export type ChatroomDetailsProps = {
  description?: string | null;
};

export const ChatroomDetails: React.FC<ChatroomDetailsProps> = ({
  description,
}) => {
  return (
    <Card sx={{ padding: 2 }}>
      <Typography variant="body1">Description</Typography>
      <Typography variant="body2">
        {description ?? "No description provided."}
      </Typography>
    </Card>
  );
};

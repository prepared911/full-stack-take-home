import { Box, Container, Typography } from "@mui/material";

import { useArchivedChatroomsListQuery } from "~src/codegen/graphql";
import { ChatroomsList } from "./ChatroomsList";

export const ArchivePage: React.FC = () => {
  const { data, loading } = useArchivedChatroomsListQuery(
    {
      fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    }
  );

  const chatrooms = data?.chatrooms ?? [];

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h5">Archive</Typography>
      </Box>
      <ChatroomsList loading={loading} chatrooms={chatrooms} />
    </Container>
  );
};

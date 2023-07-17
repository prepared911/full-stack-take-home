import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ArchivePage, ChatroomsPage } from "~src/modules/chatroom";
import { AppLayout } from "./AppLayout";
import { ErrorPage } from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ChatroomsPage />,
      },
      {
        path: "chatrooms",
        element: <ChatroomsPage />,
      },
      {
        path: "archive",
        element: <ArchivePage />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

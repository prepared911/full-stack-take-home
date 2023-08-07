import * as React from "react";
import {
    Box,
  } from "@mui/material";

interface ChatroomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: string;
}

const TABS = ["description", "notes"];

export function ChatroomTabPanel(props: ChatroomTabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== TABS[index]}
        id={`chatroom-tab-${index}`}
        aria-labelledby={`chatroom-tab-${index}`}
        {...other}
      >
        {value === TABS[index] && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}


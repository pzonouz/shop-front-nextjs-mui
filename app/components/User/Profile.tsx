"use client";

import { UserType } from "@/types/UserType";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import { UserInfo } from "./UserInfo";
import { OrdersInfoComponent } from "../order/OrdersInfo";

const ProfileComponent = ({ user }: { user: UserType }) => {
  const [tab, setTab] = useState("info");
  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={(e, newValue) => {
            setTab(newValue);
          }}
          aria-label="lab API tabs example"
        >
          <Tab label="Info" value="info" />
          <Tab label="Orders" value="orders" />
          <Tab label="Favorites" value="favorites" />
        </TabList>
      </Box>
      <TabPanel value="info">
        <UserInfo user={user} />
      </TabPanel>
      <TabPanel value="orders">
        <OrdersInfoComponent user={user} />
      </TabPanel>
      <TabPanel value="favorites">Favorites</TabPanel>
    </TabContext>
  );
};

export { ProfileComponent };

"use client";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const UserMenu = ({ session }: { session: Session | null }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={session?.user?.email!} src={session?.user?.image!} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {!session?.user && (
          <MenuItem key={1} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>Signin</Typography>
          </MenuItem>
        )}
        {session?.user && (
          <MenuItem key={2} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>Profile</Typography>
          </MenuItem>
        )}
        {session?.user && (
          <MenuItem key={3} component={Link} href="/signout">
            <Typography sx={{ textAlign: "center" }}>Signout</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
export { UserMenu };

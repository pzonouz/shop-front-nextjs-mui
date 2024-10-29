"use client";
import { Box, Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "fixed",
        right: "50%",
        top: "50%",
        transform: "translate(50%,-50%)",
      }}
    >
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "4rem" }}
      >
        Are you sure?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            router.back();
          }}
          variant="contained"
          sx={{
            bgcolor: "error.main",
            "&:hover": {
              bgcolor: "error.dark",
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={() => {
            signOut({ callbackUrl: "/signin" });
          }}
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Yes
        </Button>
      </Box>
    </Box>
  );
};

export default page;

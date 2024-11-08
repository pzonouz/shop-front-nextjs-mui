import { Box, CircularProgress } from "@mui/material";

const loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(50,50,50,0.5)",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default loading;
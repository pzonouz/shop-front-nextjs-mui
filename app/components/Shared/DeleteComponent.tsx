import { Box, Button, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DeleteComponent = ({
  component,
  id,
}: {
  component: string;
  id: string;
}) => {
  return (
    <Box
      sx={{
        maxWidth: "80%",
        marginX: "auto",
        marginTop: "3rem",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>Are you sure?</Typography>
      <Box
        sx={{
          margin: "2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained">No</Button>
        <Button
          sx={{ backgroundColor: "error.main" }}
          variant="contained"
          onClick={async () => {
            "use server";
            const res = await fetch(
              `${process.env.BACKEND_URL}/${component}/${id}`,
              {
                method: "DElETE",
              },
            );
            if (res.ok) {
              revalidatePath(`/admin/${component}`);
              redirect(`/admin/${component}`);
            }
          }}
        >
          Yes
        </Button>
      </Box>
    </Box>
  );
};
export { DeleteComponent };

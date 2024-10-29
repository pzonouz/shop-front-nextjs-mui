import { CategoryType } from "@/app/types/CategoryType";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { AddCategory } from "@/app/components/Category/AddCategory";

const page = async () => {
  const resCategories = await fetch(`${process.env.BACKEND_URL}/category/`);
  const categories: CategoryType[] = await resCategories.json();
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ textAlign: "center", marginTop: "1rem" }} variant="h4">
        Categories
      </Typography>
      <AddCategory />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {categories?.map((category) => {
          return (
            <ListItem
              sx={{ width: "100%" }}
              key={category?.id}
              secondaryAction={
                <Box
                  sx={{
                    display: "flex",
                    gap: "2rem",
                    paddingX: "1rem",
                    flexDirection: "row",
                  }}
                >
                  <IconButton
                    LinkComponent={Link}
                    href={`/admin/category/${category?.id}/edit`}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                    edge="end"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    LinkComponent={Link}
                    href={`/admin/category/${category?.id}/delete`}
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                    edge="end"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              disablePadding
            >
              <ListItemButton sx={{ padding: "1rem" }} role={undefined} dense>
                <ListItemText primary={category?.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default page;

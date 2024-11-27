"use client";
import { DeleteCartItem, EditCartItem } from "@/actions/cart.action";
import { OrderRecordType } from "@/types/OrderRecordType";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Fab,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
const CartItem = ({ record }: { record: OrderRecordType }) => {
  const [_upState, upAction, upLoading] = useActionState(EditCartItem, null);
  const [_downState, downAction, downLoading] = useActionState(
    EditCartItem,
    null,
  );
  const [_deleteState, deleteAction, deleteLoading] = useActionState(
    DeleteCartItem,
    null,
  );
  return (
    <>
      <Box
        key={record?.id}
        style={{
          width: "30rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 0,
            flexDirection: "column",
            alignItems: "center",
            marginRight: "0.1rem",
          }}
        >
          <Avatar
            sx={{ marginRight: "0.5rem" }}
            alt={record?.product?.title}
            src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}/${record?.product?.images[0].path}`}
          />
          <Typography sx={{ fontSize: "0.5rem" }}>
            {record?.product?.title}
          </Typography>
        </Box>

        <OutlinedInput
          key={record?.quantity}
          defaultValue={record?.quantity}
          sx={{
            fontSize: "0.75rem",
            maxWidth: "6.5rem",
            textAlign: "start",
            padding: 0,
          }}
          size="small"
          disabled
          endAdornment={
            <InputAdornment position="end">
              <Box component="form" action={upAction}>
                <input hidden name="id" defaultValue={record?.id} />
                <input
                  hidden
                  name="quantity"
                  defaultValue={record?.quantity + 1}
                />
                <IconButton type="submit" color="success" size="small">
                  {upLoading ? (
                    <CircularProgress color="success" size={20} />
                  ) : (
                    <ArrowDropUpIcon />
                  )}
                </IconButton>
              </Box>
              <Box component="form" action={downAction}>
                <input hidden name="id" defaultValue={record?.id} />
                <input
                  hidden
                  name="quantity"
                  defaultValue={record?.quantity - 1}
                />
                <IconButton type="submit" color="error" size="small">
                  {downLoading ? (
                    <CircularProgress color="error" size={20} />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </IconButton>
              </Box>
            </InputAdornment>
          }
        />
        <Typography
          sx={{
            textAlign: "center",
            marginX: "0.2rem",
            fontSize: "1rem",
          }}
        >
          *
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", marginRight: "0.1rem" }}>
          {record?.product?.price.toLocaleString("en-US")}
        </Typography>
        <Typography sx={{ marginRight: "0.1rem" }}>=</Typography>
        <Typography sx={{ marginRight: "0.1rem", fontSize: "0.75rem" }}>
          {(record?.price * record?.quantity).toLocaleString("en-Us")}
        </Typography>
        <Box sx={{ position: "absolute", right: "0.2rem" }}>
          <Box
            component="form"
            action={deleteAction}
            sx={{ position: "relative", display: "inline-flex" }}
          >
            <input type="text" hidden defaultValue={record?.id} name="id" />
            <Fab
              size="small"
              type="submit"
              color="error"
              disabled={deleteLoading}
            >
              <DeleteIcon />
            </Fab>
            {deleteLoading && (
              <CircularProgress
                size={40}
                sx={{
                  color: "error.main",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem />
    </>
  );
};
export { CartItem };

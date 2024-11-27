"use client";

import {
  IconButton,
  Popover,
  Box,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";
import React from "react";
import { CartItem } from "./CartItem";
import { OrderRecordType } from "@/types/OrderRecordType";
import { redirect } from "next/navigation";

const CartPopOver = ({ orderRecords }: { orderRecords: OrderRecordType[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  if (!Array.isArray(orderRecords)) return null;
  return (
    <Box sx={{ marginRight: "0.5rem" }}>
      <IconButton
        sx={{ color: grey[50] }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <Badge badgeContent={orderRecords?.length} color="secondary">
          <CartIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {orderRecords?.map((record) => {
          return <CartItem key={record?.id} record={record} />;
        })}
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                textAlign: "right",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Total Count:</Typography>
              <Typography
                sx={{
                  padding: "0.2rem",
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                {orderRecords?.reduce((a, b) => a + b?.quantity, 0)} PCs
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", textAlign: "right" }}>
              <Typography>Total Price:</Typography>
              <Typography
                sx={{
                  color: "white",
                  backgroundColor: "error.main",
                  padding: "0.2rem",
                }}
              >
                {orderRecords
                  ?.reduce((a, b) => a + b?.quantity * b?.product?.price, 0)
                  .toLocaleString("en-US")}{" "}
                T
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => {
              setAnchorEl(null);
              redirect("/shop/order-process");
            }}
            variant="contained"
            color="success"
          >
            Proceed
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export { CartPopOver };

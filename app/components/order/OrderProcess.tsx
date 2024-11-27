"use client";
import { EditUserAction } from "@/actions/Auth.action";
import { EditOrderAction } from "@/actions/Order.action";
import { OrderRecordType } from "@/types/OrderRecordType";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useEffect, useState } from "react";

const OrderProcessComponent = ({
  order,
  user,
}: {
  order: { records: OrderRecordType[]; shipping_method: string; id: string };
  user: any;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [editUserState, editUserAction, editUserLoading] = useActionState(
    EditUserAction,
    null,
  );
  const [editOrderState, editOrderAction, editOrderLoading] = useActionState(
    EditOrderAction,
    null,
  );
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  useEffect(() => {
    if (editUserState?.success) {
      setActiveStep((current) => current + 1);
    }
    if (editUserState?.error) {
    }
  }, [editUserState]);

  useEffect(() => {
    if (editOrderState?.success) {
      setActiveStep((current) => current + 1);
    }
    if (editOrderState?.error) {
    }
  }, [editOrderState]);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Order Completed,Track your order from your profile.
        </Alert>
      </Snackbar>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={1} component="form" action={editUserAction}>
          <StepLabel>Set shipping Address</StepLabel>
          <StepContent>
            <TextField
              name="address"
              fullWidth
              variant="filled"
              minRows={3}
              defaultValue={user?.address}
              multiline
            />
            <Box
              sx={{
                mb: 2,
                display: "flex",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              <LoadingButton
                sx={{ paddingX: "0.5rem" }}
                loading={editUserLoading}
                type="submit"
                variant="contained"
              >
                Continue
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => setActiveStep((current) => current - 1)}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step key={2}>
          <StepLabel>Confirm Order</StepLabel>
          <StepContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {order?.records?.map((record) => (
                <Box key={record?.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0",
                      }}
                    >
                      <Avatar
                        src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}/${record?.product?.images[0].path}`}
                      />
                      <Typography>{record?.product?.title}</Typography>
                    </Box>
                    <Typography>
                      {record?.quantity.toLocaleString("en-US")}
                    </Typography>
                    <Typography>*</Typography>
                    <Typography>
                      {record?.product?.price.toLocaleString("en-US")}
                    </Typography>
                    <Typography>=</Typography>
                    <Typography>
                      {(
                        record?.product?.price * record?.product?.quantity
                      ).toLocaleString("en-US")}
                    </Typography>
                  </Box>
                  <Divider orientation="horizontal" />
                </Box>
              ))}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography>Total Price:</Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    paddingX: "0.5rem",
                    backgroundColor: "error.main",
                    color: "white",
                    marginLeft: "0.5rem",
                  }}
                >
                  {order?.records
                    ?.reduce(
                      (a, b) => a + b.product?.price * b.product?.quantity,
                      0,
                    )
                    .toLocaleString("en-US")}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setActiveStep((current) => current + 1)}
              >
                Continue
              </Button>
              <Button
                variant="outlined"
                onClick={() => setActiveStep((current) => current - 1)}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step key={3}>
          <StepLabel>Shipping Method</StepLabel>
          <StepContent>
            <Box action={editOrderAction} component="form">
              <input name="id" hidden type="text" defaultValue={order?.id} />
              <RadioGroup
                defaultValue={order?.shipping_method}
                name="shipping_method"
              >
                <FormControlLabel value="bus" control={<Radio />} label="Bus" />
                <FormControlLabel
                  value="post"
                  control={<Radio />}
                  label="Post"
                />
                <FormControlLabel
                  value="in_place"
                  control={<Radio />}
                  label="In place"
                />
              </RadioGroup>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  gap: "2rem",
                  marginTop: "2rem",
                }}
              >
                <LoadingButton
                  loading={editOrderLoading}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={() => setActiveStep((current) => current - 1)}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </StepContent>
        </Step>
        <Step key={4}>
          <StepLabel>Payment</StepLabel>
          <StepContent>
            <Box
              component="form"
              action={editOrderAction}
              sx={{
                mb: 2,
                display: "flex",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              <input hidden name="id" type="text" defaultValue={order?.id} />
              <input
                hidden
                name="status"
                type="text"
                defaultValue={"pending"}
              />
              <LoadingButton
                loading={editOrderLoading}
                type="submit"
                variant="contained"
              >
                Finnish
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => setActiveStep((current) => current - 1)}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
};

export { OrderProcessComponent };

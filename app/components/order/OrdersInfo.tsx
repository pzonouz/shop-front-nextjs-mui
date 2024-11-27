"use client";
import { UserType } from "@/types/UserType";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

const OrdersInfoComponent = ({ user }: { user: UserType }) => {
  const orderStatuses = ["pending", "processing", "delivered", "cancelled"];
  return (
    <Box>
      {orderStatuses.map((status) => (
        <Accordion key={status}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {status}
          </AccordionSummary>
          <AccordionDetails>
            {user?.orders
              ?.filter((order) => order.status == status)
              .map((order) => {
                const date = new Date(order?.created_at);
                return (
                  <Accordion key={order?.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {date?.toLocaleString()}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                        }}
                      >
                        {order?.records.map((record) => (
                          <Box key={record?.id}>
                            <Badge
                              badgeContent={record?.quantity}
                              color="secondary"
                            >
                              <Image
                                width={50}
                                height={50}
                                alt={record?.product?.title}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}/${record?.product?.images[0].path}`}
                              />
                            </Badge>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
export { OrdersInfoComponent };

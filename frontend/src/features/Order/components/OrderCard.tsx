import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { formatCurrency } from "../../../utils/currency";
import { Order } from "../types";
import OrderStatusLabel from "./OrderStatusLabel";
import { useNavigate } from "react-router-dom";

type OrderItemProps = {
  order: Order;
  handleClickDetail: (order: Order) => void;
};

function OrderCard({ order, handleClickDetail }: OrderItemProps) {
  const items = order.items;
  const firstItem = items[0];
  const navigate = useNavigate();

  return (
    <Card className="border-[0.5px] border-gray-200" shadow={false}>
      <CardHeader
        className="mx-6 flex flex-row items-center"
        floated={false}
        shadow={false}
      >
        <Typography>{order.orderTime.split("T")[0]}</Typography>
        <div className="ml-5">
          <OrderStatusLabel statusKey={order.status} />
        </div>
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center">
        <img
          src={firstItem.product.image.image}
          alt={`Image of ${firstItem.product.title}`}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex flex-col ml-4 w-[950px]">
          <Typography variant="h6">{firstItem.product.title}</Typography>
          <Typography variant="paragraph">
            {firstItem.quantity} x {formatCurrency(firstItem.unitPrice)}
          </Typography>
          {items.length > 1 && (
            <Typography variant="paragraph" className="mt-2">
              + {items.length - 1} other item(s)
            </Typography>
          )}
        </div>
        <div className="flex flex-col items-end">
          <Typography variant="paragraph">Total price</Typography>
          <Typography variant="h6">
            {formatCurrency(order.totalPrice)}
          </Typography>
          <div className="flex flex-row gap-3">
            <Button
              className="mt-5"
              color="light-green"
              onClick={() => handleClickDetail(order)}
            >
              See details
            </Button>
            {order.status === "a" && (
              <Button
                className="mt-5"
                color="light-green"
                variant="outlined"
                onClick={() =>
                  navigate("/payment/", { state: { orderId: order.id } })
                }
              >
                Complete payment
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default OrderCard;
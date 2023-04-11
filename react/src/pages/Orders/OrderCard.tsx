import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { toCurrencyString } from "../../utils/currency";
import { Order } from "../../types";

type OrderItemProps = {
  order: Order;
  handleClickDetail: (order: Order) => void;
};

function OrderCard({ order, handleClickDetail }: OrderItemProps) {
  const items = order.items;
  const firstItem = items[0];

  return (
    <Card className="border-[0.5px] border-gray-200" shadow={false}>
      <CardHeader className="mx-6" floated={false} shadow={false}>
        {order.orderTime.split("T")[0]}
      </CardHeader>
      <CardBody className="flex flex-row">
        <img
          src={firstItem.product.image.image}
          alt={`Image of ${firstItem.product.title}`}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex flex-col ml-4 w-[950px]">
          <Typography variant="h6">{firstItem.product.title}</Typography>
          <Typography variant="paragraph">
            {firstItem.quantity} x {toCurrencyString(firstItem.unitPrice)}
          </Typography>
          {items.length > 1 && (
            <Typography variant="paragraph" className="mt-2">
              + {items.length - 1} other item(s)
            </Typography>
          )}
        </div>
        <div className="flex flex-col">
          <Typography variant="paragraph">Total price</Typography>
          <Typography variant="h6">
            {toCurrencyString(order.totalPrice)}
          </Typography>
          <Button
            className="mt-5"
            color="light-green"
            onClick={() => handleClickDetail(order)}
          >
            See details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default OrderCard;

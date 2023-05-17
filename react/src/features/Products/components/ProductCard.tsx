import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Product } from "../types";
import { formatCurrency } from "../../../utils/currency";
import ProductRatingLabel from "./ProductRatingLabel";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <Card className="w-44 border-[0.5px] border-gray-200" shadow={false}>
      <CardHeader className="m-0 rounded-b-none" floated={false} shadow={false}>
        <img
          className="object-contain h-52"
          src={
            product.images.length == 0 ? "logo512.png" : product.images[0].image
          }
          alt={`Image of product ${product.title}`}
        />
      </CardHeader>
      <CardBody>
        <Typography className="line-clamp-2 break-words" variant="h6">
          {product.title}
        </Typography>
        <Typography variant="h6">
          {formatCurrency(product.unitPrice)}
        </Typography>
        {product.averageRating && (
          <div className="mt-2">
            <ProductRatingLabel product={product} />
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default ProductCard;

import { rest } from "msw";
import baseUrl from "../url";
import { products } from "../db/products";

export const PAGE_SIZE = 15.0;
export const productsHandler = [
  rest.get(baseUrl("/store/products/"), (req, res, context) => {
    const params = req.url.searchParams;

    const page = parseInt(params.get("page") || "1");

    let filteredProducts = products.filter((product) => {
      const unitPrice = parseFloat(product.unit_price);

      if (
        params.get("price_min") &&
        unitPrice < parseFloat(<string>params.get("price_min"))
      )
        return false;

      if (
        params.get("price_max") &&
        unitPrice > parseFloat(<string>params.get("price_min"))
      )
        return false;

      // noinspection RedundantIfStatementJS
      if (
        params.get("category") &&
        product.category.id !== parseInt(<string>params.get("category"))
      )
        return false;

      return true;
    });

    const paginatedResult = filteredProducts.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

    console.log(paginatedResult);

    return res(
      context.status(200),
      context.json({
        results: paginatedResult,
        total_pages: Math.ceil(filteredProducts.length / PAGE_SIZE),
      })
    );
  }),
];

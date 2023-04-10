import { instance, login, logout, REFRESH_KEY } from "./client";

export { login, logout };

export const getAuthenticationStatus = () => {
  return localStorage.getItem(REFRESH_KEY) !== null;
};

export type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};
export const retrieveProfile = async () => {
  const response = await instance.get<User>("/auth/users/me/");
  return response.data;
};

export type ProductImageResponse = {
  id: number;
  image: string;
};
export type ProductResponse = {
  id: number;
  title: string;
  slug: string;
  description: string;
  unit_price: number;
  inventory: number;
  collection: number;
  images: ProductImageResponse[];
};
export type ProductListResponse = {
  results: ProductResponse[];
  total_pages: number;
};
export const retrieveProductsList = async (search: string, page: number) => {
  const response = await instance.get<ProductListResponse>("/store/products/", {
    params: {
      page: page,
      search: search,
    },
  });
  return response.data;
};

export const retrieveProductDetail = async (slug: string) => {
  const response = await instance.get<ProductResponse>(
    `/store/products/${slug}/`
  );
  return response.data;
};

export const createCartItem = async (productId: number) => {
  try {
    const response = await instance.post("/store/cart-items/", {
      product_id: productId,
      quantity: 1,
    });
    return response.status === 201;
  } catch (e) {
    return false;
  }
};

type SimpleProduct = {
  id: number;
  title: string;
  unit_price: number;
  inventory: number;
  image: ProductImageResponse;
};
export type CartItemResponse = {
  id: number;
  product: SimpleProduct;
  quantity: number;
  total_price: number;
};
export const retrieveCartItemList = async () => {
  const response = await instance.get<CartItemResponse[]>("/store/cart-items/");
  return response.data;
};

export const updateCartItemQuantity = async (
  id: number,
  newQuantity: number
) => {
  const response = await instance.patch(`/store/cart-items/${id}/`, {
    quantity: newQuantity,
  });
  return response.status === 200;
};

export const deleteCartItem = async (id: number) => {
  const response = await instance.delete(`/store/cart-items/${id}/`);
  return response.status === 204;
};

export type SubmitOrderResponse = {
  order_id: string;
};
export const submitOrder = async () => {
  const response = await instance.post<SubmitOrderResponse>("/store/orders/");
  return response.data.order_id;
};

export type createPaymentResponse = {
  client_secret: string;
};
export const createPayment = async (orderId: string) => {
  const response = await instance.post<createPaymentResponse>(
    "/store/orders/create_payment",
    {
      order_id: orderId,
    }
  );
  return response.data.client_secret;
};

export const submitPayment = async (paymentMethodId: string) => {
  const response = await instance.post("/store/payments/", {
    payment_method_id: paymentMethodId,
  });
  return response.status === 200;
};

export type OrderItemResponse = {
  id: string;
  order_id: string;
  product: SimpleProduct;
  unit_price: number;
  quantity: number;
  total_price: number;
};

export type OrderResponse = {
  id: string;
  items: OrderItemResponse[];
  total_price: number;
  order_time: string;
};
type OrderListResponse = {
  results: OrderResponse[];
  total_pages: number;
};
export const retrieveOrderList = async () => {
  const response = await instance.get<OrderListResponse>("/store/orders/");
  return response.data.results;
};

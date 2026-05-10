export interface OrderItemDto {
  id: number;
  quantity: number;
  color: string;
  storage: number;
  price: number;

  product: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

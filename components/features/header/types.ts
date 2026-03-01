export type CartItemProps = {
  id: number;
  imageUrl: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
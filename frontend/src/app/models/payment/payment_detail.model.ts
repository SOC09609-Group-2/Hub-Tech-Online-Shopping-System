export interface Payment_detailModel {
  id?: number;
  customerSlug: string;
  supplier_id: number;
  payment_id: number;
  qty: number;
  product_id: number;
  product_name: string;
  unit_price: number;
  total_price: number;
  order_no: string;
  year?: string;
  month?: string;
  date?: string;
  created_at?: Date;
  updated_at?: Date;
}

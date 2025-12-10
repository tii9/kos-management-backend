export type TenantType = {
  name: string;
  phone: string;
  start_date: Date;
  next_payment_date: Date;
  payment_status: "pending" | "paid" | "overdue";
  is_active: boolean;
  roomId?: string;
};

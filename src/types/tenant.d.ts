export type TenantType = {
  name: string;
  phone: string;
  start_date: Date;
  next_payment_date: Date;
  is_active: boolean;
  roomId?: string;
};

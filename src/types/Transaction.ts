export type Transaction = {
  id: number;
  type: string; // only these two values are allowed
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  authorizedUser: string | null;
};
export interface Campaign {
  campaign_name: string;
  min_quota: number;
  max_quota: number;
  max_amount: number;
  min_amount: number;
  tea: number;
  payment_date: string;
  currency: string;
}

export type IPosCalculateQuota = {
  cuota: number;
  amount: number;
};

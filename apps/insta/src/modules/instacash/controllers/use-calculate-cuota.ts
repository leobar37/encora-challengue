import { useMutation } from "@tanstack/react-query";
import { baseApi } from "../../../core/base-api";
import { IPosCalculateQuota } from "../types";
export const useCalculateCuota = () => {
  return useMutation({
    mutationFn: async (data: IPosCalculateQuota) => {
      return baseApi
        .post<{
          monthly_amount: number;
        }>("/calculate-cuota", data)
        .then((res) => res.data);
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { baseApi } from "../../../core/base-api";
import { Campaign } from "../types";
export const useCampaign = (name: string) => {
  return useQuery<Campaign>({
    queryKey: ["campaign", name],
    suspense: true,
    queryFn: () => {
      return baseApi.get(`/campaign/${name}`).then((res) => res.data);
    },
  });
};

export const useInstaCashCampaign = () => {
  return useCampaign("InstaCash");
};

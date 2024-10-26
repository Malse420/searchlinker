import { useQuery } from "@tanstack/react-query";
import { getDomainsAPI } from "@/lib/api";

export const useDomains = () => {
  return useQuery({
    queryKey: ["domains"],
    queryFn: getDomainsAPI,
  });
};
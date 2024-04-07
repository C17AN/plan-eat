import { Restaurant } from "@/types/Restaurant";
import { useQuery } from "@tanstack/react-query";

export const getRestaurantList = async (): Promise<Restaurant[]> => {
  const res = await fetch("restaurant.json");
  return await res.json();
};

export const useRestaurantListQuery = () => {
  return useQuery({
    queryKey: ["restaurant.json"],
    queryFn: getRestaurantList,
  });
};

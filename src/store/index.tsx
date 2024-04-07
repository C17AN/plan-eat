import { Restaurant } from "@/types/Restaurant";
import { create } from "zustand";

export const useRestaurantStore = create<{
  selectedRestaurant?: Restaurant;
  setSelectRestaurant: (restaurant: Restaurant) => void;
}>((set) => ({
  selectedRestaurant: undefined,
  setSelectRestaurant: (restaurant: Restaurant) =>
    set(() => ({ selectedRestaurant: restaurant })),
}));

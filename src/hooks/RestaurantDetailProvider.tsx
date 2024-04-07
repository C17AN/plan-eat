import { Restaurant } from "@/types/Restaurant";
import { ReactNode, createContext, useContext, useState } from "react";

const RestaurantDetailContext = createContext<
  | Restaurant
  | {
      isVisible: boolean;
      restaurantDetail?: Restaurant;
      toggleVisible: (restaurant: Restaurant) => void;
    }
>({
  isVisible: false,
  restaurantDetail: undefined,
  toggleVisible: () => {},
});

export const useRestaurantDetail = () => useContext(RestaurantDetailContext);

export const RestaurantDetailProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState<Restaurant>();

  const toggleVisible = (restaurant: Restaurant) => {
    if (isVisible) {
      setIsVisible(false);
      setRestaurantDetail(undefined);
    } else {
      setIsVisible(true);
      setRestaurantDetail({ ...restaurant });
    }
  };
  return (
    <RestaurantDetailContext.Provider
      value={{ isVisible, toggleVisible, restaurantDetail }}
    >
      {children}
    </RestaurantDetailContext.Provider>
  );
};

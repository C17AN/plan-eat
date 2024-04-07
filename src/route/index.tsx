import { MapProvider } from "@/hooks/MapProvider";
import { RestaurantDetailProvider } from "@/hooks/RestaurantDetailProvider";
import Admin from "@/pages/Admin";
import CompanyRestaurant from "@/pages/CompanyRestaurant";
import Main from "@/pages/Main";
import NearRestaurants from "@/pages/NearRestaurants";
import { createBrowserRouter } from "react-router-dom";

export const routes = {
  메인: "/",
  주변_식당: "/near-restaurants",
  구내_식당: "/company-restaurant",
  어드민: "/admin",
};

export const router = createBrowserRouter([
  {
    path: routes.메인,
    element: <Main />,
  },
  {
    path: routes.주변_식당,
    element: (
      <MapProvider>
        <RestaurantDetailProvider>
          <NearRestaurants />
        </RestaurantDetailProvider>
      </MapProvider>
    ),
  },
  {
    path: routes.구내_식당,
    element: <CompanyRestaurant />,
  },
  {
    path: routes.어드민,
    element: <Admin />,
  },
]);

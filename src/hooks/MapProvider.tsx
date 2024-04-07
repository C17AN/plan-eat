import { COMPANY_COORDINATE } from "@/constants";
import { useRestaurantStore } from "@/store";
import { getEmojiByCategory } from "@/utils/getEmojiByCategory";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRestaurantListQuery } from "./useRestaurantListQuery";

const MapContext = createContext<{ map?: naver.maps.Map }>({
  map: undefined,
});

export const useMap = () => useContext(MapContext);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<naver.maps.Map>();
  const [markerList, setMarkerList] = useState<naver.maps.Marker[]>([]);
  const { data: restaurantList } = useRestaurantListQuery();
  const { selectedRestaurant, setSelectRestaurant } = useRestaurantStore();

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    if (map && restaurantList) {
      loadMarker();
    }
  }, [map, restaurantList]);

  useEffect(() => {
    if (!map || !markerList) return;
    naver.maps.Event.addListener(map, "zoom_changed", function () {
      updateMarkers(markerList);
    });

    naver.maps.Event.addListener(map, "dragend", function () {
      updateMarkers(markerList);
    });
  }, [markerList, map]);

  const loadMap = () => {
    var mapOptions = {
      center: new naver.maps.LatLng(
        COMPANY_COORDINATE.latitude,
        COMPANY_COORDINATE.longitude
      ),
      zoom: 18,
    };

    const map = new naver.maps.Map("map", mapOptions);
    setMap(() => map);

    new naver.maps.Marker({
      position: new naver.maps.LatLng(
        COMPANY_COORDINATE.latitude,
        COMPANY_COORDINATE.longitude
      ),
      map: map,
      clickable: true,
    });
  };

  const loadMarker = async () => {
    const _markerList: naver.maps.Marker[] = [];
    restaurantList?.forEach((restaurant) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          Number(restaurant.latitude),
          Number(restaurant.longitude)
        ),
        icon: {
          content: `<div style ="border: 1px solid #cdcdcd80; padding: 2px 4px; background-color: #fff; border-radius: 8px;">${getEmojiByCategory(
            restaurant.category
          )}</div>`,
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35),
        },
        map: map,
        clickable: true,
      });

      marker.addListener("click", () => {
        setSelectRestaurant({ ...restaurant });
      });

      marker.addListener("hover", () => {
        alert("dl");
      });

      _markerList.push(marker);
    });

    setMarkerList(() => [..._markerList]);
  };

  const updateMarkers = (markerList: naver.maps.Marker[]) => {
    if (!map) return;
    const mapBounds = map.getBounds();
    var marker, position;

    for (var i = 0; i < markerList.length; i++) {
      marker = markerList[i];
      position = marker.getPosition();

      if ((mapBounds as any).hasLatLng(position)) {
        showMarker(marker);
      } else {
        hideMarker(marker);
      }
    }
  };

  function showMarker(marker: naver.maps.Marker) {
    if (!map) return;
    marker.setMap(map);
  }

  function hideMarker(marker: naver.maps.Marker) {
    marker.setMap(null);
  }

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
};

import { AVERAGE_WALK_SPEED, COMPANY_COORDINATE } from "@/constants";
import { useMap } from "@/hooks/MapProvider";
import { useRestaurantStore } from "@/store";
import { Restaurant } from "@/types/Restaurant";
import { getDistanceByCoordinate } from "@/utils/getDistanceByCoordinate";
import styled from "@emotion/styled";
import { useMemo } from "react";

const RestaurantListItem = (restaurant: Restaurant) => {
  const { map } = useMap();
  const { latitude, longitude, name, tags } = restaurant;
  const { setSelectRestaurant, selectedRestaurant } = useRestaurantStore();

  const handleFocusToRestaurant = () => {
    setSelectRestaurant(restaurant);
    const target = new naver.maps.LatLng(latitude, longitude);
    map?.setZoom(18);
    map?.panTo(target);
  };

  const distance = useMemo(
    () =>
      Number(
        getDistanceByCoordinate({
          srcLat: COMPANY_COORDINATE.latitude,
          srcLng: COMPANY_COORDINATE.longitude,
          distLat: latitude,
          distLng: longitude,
        }).toFixed(2)
      ),
    [latitude, longitude]
  );

  return (
    <Container
      onClick={handleFocusToRestaurant}
      selected={selectedRestaurant?.name === name}
    >
      <Title>{name}</Title>
      <Distance>
        {`${distance}km`}
        {", "}
        {`도보 ${Math.ceil((distance / AVERAGE_WALK_SPEED) * 60)}분`}
      </Distance>
      {tags?.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  list-style-type: none;
  border: 2px solid;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 0.8rem 1rem;
  transition: 0.2s ease-in-out border-color;
  border-color: ${({ selected }) => (selected ? "#81b2f7" : "#cdcdcdb5")};
  cursor: ${({ selected }) => (selected ? "auto" : "pointer")};
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 4px;
`;

const Distance = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #66666699;
  margin-bottom: 6px;
`;

const Tag = styled.span`
  padding: 4px 7px;
  font-size: 12px;
  background-color: #cccccc60;
  border-radius: 8px;
  margin-right: 4px;
  &:last-of-type {
    margin-right: 0;
  }
`;

export default RestaurantListItem;

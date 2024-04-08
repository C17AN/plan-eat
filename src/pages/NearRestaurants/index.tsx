import Toggle from "@/components/Toggle";
import { useRestaurantListQuery } from "@/hooks/useRestaurantListQuery";
import { Dining, categoryList } from "@/types/Restaurant";
import styled from "@emotion/styled";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import RestaurantListItem from "./RestaurantListItem";

type Category = { name: string; value: Dining };

const DINING_CATEGORY: Category[] = [
  {
    name: "식사",
    value: "식사",
  },
  {
    name: "디저트",
    value: "카페",
  },
];

const NearRestaurants = () => {
  const { data: restaurantList } = useRestaurantListQuery();
  const [diningCategory, setDiningCategory] = useState<Category>(
    DINING_CATEGORY[0]
  );
  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });
  const [] = useState();

  const handleDiningCategoryChange = (v: Category) => {
    setDiningCategory(v);
  };

  const filteredRestaurantList = ({
    diningCategory,
    foodCategory,
  }: {
    diningCategory: Dining;
    foodCategory?: Category;
  }) => {
    return restaurantList?.filter((restaurant) => {
      if (diningCategory.value === "식사") {
        return restaurant.category === foodCategory;
      } else {
        return restaurant.type === "카페";
      }
    });
  };

  return (
    <Container>
      <MapContainer>
        <DescriptionContainer>
          <h2>근처 식당 목록</h2>
          <Toggle
            onChange={handleDiningCategoryChange}
            items={DINING_CATEGORY}
          />
          <Input placeholder="식당 이름 또는 키워드를 검색해보세요" />
          <ResturantList>
            {diningCategory.value === "식사" ? (
              categoryList.map((category) => (
                <li key={category}>
                  <CategoryTitle>{category}</CategoryTitle>
                  {filteredRestaurantList({
                    diningCategory,
                    foodCategory: category,
                  })?.map((restaurant) => (
                    <RestaurantListItem key={restaurant.url} {...restaurant} />
                  ))}
                </li>
              ))
            ) : (
              <>
                {filteredRestaurantList({
                  diningCategory,
                })?.map((restaurant) => (
                  <RestaurantListItem key={restaurant.url} {...restaurant} />
                ))}
              </>
            )}
          </ResturantList>
        </DescriptionContainer>
        <div
          id="map"
          style={{
            width: "100%",
            flex: 1,
            borderRadius: 20,
            overflow: "hidden",
          }}
        />
        {/* <RestautantDetail /> */}
      </MapContainer>
    </Container>
  );
};

const Container = styled.main`
  height: 100dvh;
  max-height: 100vh;
  padding: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DescriptionContainer = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid #cdcdcd;
  border-radius: 8px;
  padding: 1rem 1.4rem;
  margin-right: 2rem;
  overflow: hidden;

  h2 {
    margin-bottom: 12px;
  }
`;

const Input = styled.input`
  margin: 16px 0;
  border-radius: 8px;
  padding: 4px 12px;
  outline: none;
  border: 1px solid #cdcdcd;
`;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 8px;
`;

const ResturantList = styled.ul`
  padding: 0;
  flex: 1;
  height: 100%;
  overflow-y: scroll;
`;

export default NearRestaurants;

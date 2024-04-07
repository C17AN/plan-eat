import { useRestaurantStore } from "@/store";
import { Restaurant } from "@/types/Restaurant";
import styled from "@emotion/styled";

interface Props extends Restaurant {
  position: {
    y: number;
    x: number;
  };
}

const RestautantDetail = ({ name }: Props) => {
  const { selectedRestaurant } = useRestaurantStore();
  console.log(selectedRestaurant);
  return <Container>{selectedRestaurant?.name}</Container>;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 24px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 8px;
`;

export default RestautantDetail;

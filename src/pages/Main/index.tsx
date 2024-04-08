import { default as RandomEmoji } from "@/components/EmojiCloud";
import { routes } from "@/route";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import SendOpinion from "./components/SendOpinion";

const Main = () => {
  const navigate = useNavigate();

  const routeToAdmin = () => {
    navigate(routes.어드민);
  };

  const routeToNearRestaurant = () => {
    navigate(routes.주변_식당);
  };

  return (
    <Container>
      {/* <TextCloud /> */}
      <TitleContainer>
        <Title>앗, 벌써 점심시간이잖아? 🙂</Title>
        <Title>
          🍴 오늘 메뉴는 뭐가 좋을까? <RandomEmoji />
        </Title>
      </TitleContainer>
      <IntroButton onClick={routeToNearRestaurant}>
        주변 식당 둘러보기
      </IntroButton>

      <IntroButton onClick={routeToNearRestaurant}>
        구내식당 메뉴 둘러보기
      </IntroButton>
      <SendOpinion />
      {/* <ul>
        <Menu onClick={routeToAdmin}>어드민</Menu>
      </ul> */}
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: 100dvh;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4.5rem;
  margin: 20px 0;
`;

const Title = styled.h1`
  position: absolute;
  font-size: 4rem;
  font-weight: 700;
  animation: title1 2s forwards;
  line-height: 4.5rem;
  opacity: 0;

  &:last-of-type {
    animation: title2 1.32s forwards;
    animation-delay: 2.5s;
  }

  @keyframes title1 {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes title2 {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IntroButton = styled.button`
  background-color: transparent;
  font-size: 32px;
  outline: none;
  border: none;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 12px;
  color: #444;
  transition: 0.2s ease-in-out background-color, 0.2s ease-in-out color;
  /* animation: swing 2s infinite backwards; */

  &:hover {
    background-color: #efefefda;
    color: #111;
    cursor: pointer;
  }

  @keyframes swing {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default Main;

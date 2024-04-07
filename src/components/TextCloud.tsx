import styled from "@emotion/styled";

type Props = {};

const TextCloud = (props: Props) => {
  return (
    <Container>
      <div>커뮤니케이션기술개발팀 OO 매니저의 추천!</div>
      <div>법무팀 OO 매니저의 추천!</div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`;

export default TextCloud;

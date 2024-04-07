import styled from "@emotion/styled";
import { useState } from "react";

type Selectable = {
  name: string;
  value: any;
};

type Props = {
  items: Selectable[];
  onChange: (value: Selectable) => void;
};

const Toggle = ({ items, onChange }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (item: Selectable, index: number) => {
    setActiveIndex(index);
    onChange(item);
  };

  return (
    <Container>
      <Highlight selected={activeIndex === 0} />
      {items?.map((item, index) => (
        <ToggleOption
          key={item.value}
          onClick={() => handleChange(item, index)}
          selected={activeIndex === index}
        >
          {item.name}
        </ToggleOption>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(254, 254, 254, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.02);
  padding: 10px;
`;

const Highlight = styled.div<{ selected: boolean }>`
  position: absolute;
  background-color: #d8d8d8d6;
  border-radius: 10px;
  transition: all 0.3s ease;
  padding: 10px;
  width: calc(50% - 20px);
  height: calc(100% - 20px);
  z-index: 1;
  left: ${({ selected }) => (selected ? "10px" : "calc(50% + 10px)")};
  box-shadow: 2px 2px rgba(0, 0, 0, 0.02);
`;

const ToggleOption = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  position: relative;
  z-index: 2;
  padding: 0.4rem 0;
  color: ${({ selected }) => (selected ? "#111" : "#cdcdcd")};
  transition: 0.2s ease-in-out color;
`;

export default Toggle;

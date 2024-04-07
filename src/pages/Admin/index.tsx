import { useRestaurantListQuery } from "@/hooks/useRestaurantListQuery";
import { Category, Dining, categoryList } from "@/types/Restaurant";
import { useState } from "react";

const Admin = () => {
  const [url, setUrl] = useState<string>("");
  const [category, setCategory] = useState<Category>();
  const [diningType, setDiningType] = useState<Dining>();
  const [code, setCode] = useState<string>("");
  const { data: restaurantList } = useRestaurantListQuery();

  const handleSelectCategory = (category: Category) => {
    setCategory(() => category);
    navigator.clipboard.writeText(code);
  };

  const handleSelectDiningType = (dining: Dining) => {
    setDiningType(() => dining);
    navigator.clipboard.writeText(code);
  };

  const handleInput = () => {
    // 정규 표현식을 사용하여 가게 이름, 위도, 경도 추출
    const namePattern = /[\uAC00-\uD7A3]+/g;
    const latitudePattern = /3[7-8]\.\d+/;
    const longitudePattern = /12[7-8]\.\d+/;

    // 가게 이름 추출
    const nameMatches = url.match(namePattern);
    const name = nameMatches ? nameMatches[0] : null;

    // 위도 추출
    const latitudeMatches = url.match(latitudePattern);
    const latitude = latitudeMatches ? latitudeMatches[0] : null;

    // 경도 추출
    const longitudeMatches = url.match(longitudePattern);
    const longitude = longitudeMatches ? longitudeMatches[0] : null;

    if (restaurantList?.find((restaurant) => restaurant.url === url)) {
      setCode("식당 정보가 이미 존재합니다.");
      return;
    }

    setCode(
      () =>
        `
       {
          "name": "${name}",
          "latitude": "${latitude}",
          "longitude": "${longitude}",
          "url": "${url}",
          "tags": [],
          "category": ${category ? `"${category}"` : ""},
          "type": ${diningType ? `"${diningType}"` : ""}
       },
      `
    );

    navigator.clipboard.writeText(code);

    // 결과 객체 생성 및 반환
    return {
      name: name,
      latitude: latitude,
      longitude: longitude,
    };
  };

  return (
    <div>
      <div>
        <div>식사 or 카페</div>
        <button onClick={() => handleSelectDiningType("식사")}>식사</button>
        <button onClick={() => handleSelectDiningType("카페")}>카페</button>
      </div>
      <div>
        <div>카테고리</div>
        {categoryList.map((category) => (
          <button onClick={() => handleSelectCategory(category)} key={category}>
            {category}
          </button>
        ))}
      </div>
      구글 맵 좌표 입력
      <input onChange={(e) => setUrl(() => decodeURI(e.target.value))}></input>
      <button onClick={handleInput}>확인</button>
      <code>{code}</code>
    </div>
  );
};

export default Admin;

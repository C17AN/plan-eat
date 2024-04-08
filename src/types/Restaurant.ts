export type Restaurant = {
  name: string;
  latitude: number;
  longitude: number;
  url: string;
  type?: Dining;
  category: FoodCategory;
  // location?: Location;
  tags?: string[];
};

// export type Location = "우림" | "유스페이스" | "판교역";

export type FoodCategory =
  | "치킨"
  | "중식"
  | "분식"
  | "아시안"
  | "백반·죽·국수"
  | "버거"
  | "피자"
  | "양식"
  | "한식"
  | "족발·보쌈"
  | "돈까스·회·일식"
  | "고기·구이"
  | "찜·탕·찌개"
  | "샐러드·요거트·브런치"
  | "카페·디저트";

export const categoryList: FoodCategory[] = [
  "치킨",
  "중식",
  "분식",
  "아시안",
  "백반·죽·국수",
  "버거",
  "피자",
  "양식",
  "한식",
  "족발·보쌈",
  "돈까스·회·일식",
  "고기·구이",
  "찜·탕·찌개",
  "샐러드·요거트·브런치",
  "카페·디저트",
];

export type Dining = "식사" | "카페";

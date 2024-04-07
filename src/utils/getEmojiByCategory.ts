import { Category } from "@/types/Restaurant";

export const getEmojiByCategory = (category: Category) => {
  switch (category) {
    case "고기·구이":
      return "🥩";
    case "돈까스·회·일식":
      return "🇯🇵";
    case "백반·죽·국수":
      return "🍜";
    case "버거":
      return "🍔";
    case "분식":
      return "🍢";
    case "아시안":
      return "🍛";
    case "양식":
      return "🍝";
    case "족발·보쌈":
      return "🍖";
    case "중식":
      return "🇨🇳";
    case "찜·탕·찌개":
      return "🥘";
    case "치킨":
      return "🐓";
    case "샐러드·요거트":
      return "🥗";
    case "카페·디저트":
      return "☕️";
    case "피자":
      return "🍕";
    case "한식":
      return "🇰🇷";
    default:
      return "🍚";
  }
};

import { useEffect, useState } from "react";

type Props = {};

const emojis = ["🍚", "🎂", "🐟", "🍔", "🍱", "🍕", "🍝", "🥪", "☕️"];

const RandomEmoji = () => {
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    }, 1500); // Change emoji every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return <span>{currentEmoji}</span>;
};

export default RandomEmoji;

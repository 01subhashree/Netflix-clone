/* eslint-disable react/prop-types */
import Style from "./Rows.module.css";
import Card from "../card/Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef, useState } from "react";

export default function Row({ title, data, isLargeRow = false }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${178 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 13) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-178 + distance}px)`;
    }
  };
  return (
    <div className={Style.row}>
      <h2>{title}</h2>
      <div className={Style.wrapper}>
        <IoIosArrowBack
          className={Style.sliderArrow_left}
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className={Style.row_posters} ref={listRef}>
          {data.map((movie, index) => (
            <Card
              key={movie.id}
              movie={movie}
              isLargeRow={isLargeRow}
              Index={index}
            />
          ))}
        </div>
        <IoIosArrowForward
          className={Style.sliderArrow_right}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

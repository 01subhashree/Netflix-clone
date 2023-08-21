/* eslint-disable react/prop-types */
import Style from "./Rows.module.css";
import Card from "../card/Card";

export default function Row({ title, data, isLargeRow = false }) {
  return (
    <div className={Style.row}>
      <h2>{title}</h2>
      <div className={Style.row_posters}>
        {data.map((movie) => (
          <div key={movie.id}>
            <Card movie={movie} isLargeRow={isLargeRow} />
          </div>
        ))}
      </div>
    </div>
  );
}

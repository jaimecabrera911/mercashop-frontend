import React from "react";

export default function Rating(props) {
  return !props.value ? (
    <div>
      <span style={{ color: "Gold" }}>
        <i className="fa fa-star-o fa-lg"></i>
      </span>
      <span style={{ color: "Gold" }}>
        <i className="fa fa-star-o fa-lg"></i>
      </span>
      <span style={{ color: "Gold" }}>
        <i className="fa fa-star-o fa-lg"></i>
      </span>
      <span style={{ color: "Gold" }}>
        <i className="fa fa-star-o fa-lg"></i>
      </span>
      <span style={{ color: "Gold" }}>
        <i className="fa fa-star-o fa-lg"></i>
      </span>
    </div>
  ) : (
    <div>
      <div>
        <span style={{ color: "Gold" }}>
          <i
            className={
              props.value >= 1
                ? "fa fa-star fa-lg"
                : props.value >= 0.5
                ? "fa fa-star-half-o fa-lg"
                : "fa fa-star-o fa-lg"
            }
          ></i>
        </span>
        <span style={{ color: "Gold" }}>
          <i
            className={
              props.value >= 2
                ? "fa fa-star fa-lg"
                : props.value >= 1.5
                ? "fa fa-star-half-o fa-lg"
                : "fa fa-star-o fa-lg"
            }
          ></i>
        </span>
        <span style={{ color: "Gold" }}>
          <i
            className={
              props.value >= 3
                ? "fa fa-star fa-lg"
                : props.value >= 2.5
                ? "fa fa-star-half-o fa-lg"
                : "fa fa-star-o fa-lg"
            }
          ></i>
        </span>
        <span style={{ color: "Gold" }}>
          <i
            className={
              props.value >= 4
                ? "fa fa-star fa-lg"
                : props.value >= 3.5
                ? "fa fa-star-half-o fa-lg"
                : "fa fa-star-o fa-lg"
            }
          ></i>
        </span>
        <span style={{ color: "Gold" }}>
          <i
            className={
              props.value >= 5
                ? "fa fa-star fa-lg"
                : props.value >= 4.5
                ? "fa fa-star-half-o fa-lg"
                : "fa fa-star-o fa-lg"
            }
          ></i>
        </span>
      </div>
      <div>
        <span>{props.text ? props.text : ""}</span>
      </div>
    </div>
  );
}

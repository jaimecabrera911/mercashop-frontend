import React from "react";
import bannerLacteos from "./../assets/banners/bannerLacteos.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

function PromotionCarousel() {
  return (
    <div className="border bg-white mt-2 w-75">
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade w-100"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={bannerLacteos}
              className="d-block w-100"
              alt="Lacteos y huevos promoción"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601853566/banners/bannerLicores_hzk3q2.png"
              className="d-block w-100"
              alt="Licores promoción"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601853531/banners/bannerMascotas_t6rpap.png"
              className="d-block w-100"
              alt="Mascotas promoción"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dkrcosw87/image/upload/v1601853571/banners/bannerPanaderia_npd8yw.png"
              className="d-block w-100"
              alt="Panadería promoción"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            className="fa-3x"
            aria-hidden="true"
          />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            className="fa-3x"
            aria-hidden="true"
          />
          <span className="sr-only bg-dark">Next</span>
        </a>
      </div>
    </div>
  );
}

export default PromotionCarousel;

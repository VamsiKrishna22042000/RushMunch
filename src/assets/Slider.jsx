import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SimpleSlider() {
  const [offerWall, setOfferWall] = useState(() => {
    return [];
  });

  useEffect(() => {
    getOffer();
  }, []);

  const getOffer = async () => {
    try {
      const apiKey = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiKey}/restaurants-list/offers`;
      const reqConfigure = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y",
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, reqConfigure);
      if (res.status === 200) {
        /**console.log(res);*/
        setOfferWall(res.data.offers);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {offerWall.map((each) => (
        <img key={each.id} src={each.image_url} alt="offer" />
      ))}
    </Slider>
  );
}

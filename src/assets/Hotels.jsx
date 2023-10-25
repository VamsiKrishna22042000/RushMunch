import { useState, useEffect } from "react";
import "./hotels.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hotels = ({ priceSort }) => {
  const [details, setDetails] = useState(() => {
    return [];
  });
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    getHotels();
  }, [search, activePage, priceSort]);

  const getHotels = async () => {
    try {
      const limit = 9;
      let offset = (activePage - 1) * limit;
      const apiKey = import.meta.env.VITE_REACT_APP_API_URL;

      const url = `${apiKey}/restaurants-list?search=${search}&offset=${offset}&limit=${limit}&sort_by_rating=${priceSort}`;

      const reqConfigure = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y",
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, reqConfigure);

      if (res.status === 200) {
        setDetails(res.data.restaurants);
        setTotalPage(Math.ceil(res.data.total / limit));
      }
    } catch (error) {
      toast.info("Restaurant Not Found", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="hotels-con">
      <ToastContainer />
      <label>Search Restaurants &nbsp;:&nbsp; </label>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        placeholder="Enter Your Favorite Restaurant Name"
      />
      <ul className="restarants-con">
        {details.map((each) => (
          <li key={each.name}>
            <img src={each.image_url} alt={each.id} />
            <div className="restarants-details">
              <h3>{each.name}</h3>
              <p>{each.menu_type}</p>
              <div className="detials-re">
                <img src="/ratingstar.png" />
                <p style={{ marginLeft: ".25rem" }}>
                  {each.user_rating.rating}
                </p>
                <p className="details-para">
                  ({each.user_rating.total_reviews} ratings)
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pageination">
        <div>
          <button
            onClick={() => {
              activePage === 1
                ? setActivePage(1)
                : setActivePage(activePage - 1);
            }}
            type="button"
          >
            ❮
          </button>
          <p>{activePage}</p>
          <p>to</p>
          <p>{totalPages}</p>
          <button
            onClick={() => {
              activePage === totalPages
                ? setActivePage(totalPages)
                : setActivePage(activePage + 1);
            }}
            type="button"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hotels;

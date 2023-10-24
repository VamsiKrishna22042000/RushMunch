import "./home.css";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-con">
      <div>
        4<img src="404.gif" alt="Not Found" />4
      </div>
      <h4>Page Not Found</h4>
      <p>
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        type="button"
      >
        Move To Home Page
      </button>
    </div>
  );
};

export default NotFound;

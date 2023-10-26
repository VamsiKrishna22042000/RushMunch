import "./footer.css";

import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-con">
      <h2>Rush Munch</h2>
      <p>The only thing we are serious about is food.Contact us on</p>
      <div className="icons-con">
        <FaPinterestSquare />
        <FaInstagram />
        <FaTwitter />
        <FaFacebookSquare />
      </div>
    </div>
  );
};

export default Footer;

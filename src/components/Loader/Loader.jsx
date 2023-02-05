import "./Loader.scss";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/images/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;

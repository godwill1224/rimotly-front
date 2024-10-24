import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-home">
        <div className="title-home">
          <h1>
            <span>Veterinary Consultancy Services </span>Made Easy!
          </h1>
          <p>
            Rimotly offers easy and fast tele-vet consultancy through ussd prompts and sms replies.
          </p>
        </div>
        <div className="button-container">
        <Link to="/consultations">
          <a className="btn"> See all Consultations </a>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

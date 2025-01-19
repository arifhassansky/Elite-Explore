import Accordion from "../Accordion";
import Banner from "../banner/Banner";
import Overview from "../Overview";
import Tourism from "../Tourism";
import TouristStories from "../TouristStories";

const Home = () => {
  return (
    <div>
      <Banner />
      <Overview />
      <Tourism />
      <TouristStories />
      <Accordion />
    </div>
  );
};

export default Home;

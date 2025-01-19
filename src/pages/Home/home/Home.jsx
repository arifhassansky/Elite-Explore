import Accordion from "../Accordion";
import Banner from "../banner/Banner";
import EliteAbout from "../EliteAbout";
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
      <EliteAbout />
    </div>
  );
};

export default Home;

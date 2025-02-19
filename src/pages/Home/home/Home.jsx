import Accordion from "../Accordion";
import Banner from "../banner/Banner";
import EliteAbout from "../EliteAbout";
import Overview from "../Overview";
import Tourism from "../Tourism";
import TouristStories from "../TouristStories";
import NewsletterForm from "./NewsLetterForm";

const Home = () => {
  return (
    <div>
      <Banner />
      <Overview />
      <Tourism />
      <TouristStories />
      <Accordion />
      <EliteAbout />
      <NewsletterForm />
    </div>
  );
};

export default Home;

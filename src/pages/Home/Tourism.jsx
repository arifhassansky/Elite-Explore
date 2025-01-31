import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useRandomTours from "../../hooks/useRandomTours";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import useGuides from "../../hooks/useGuides";
import TourGuideCard from "../../components/TourGuideCard";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Tourism = () => {
  const [tours] = useRandomTours();
  const [guides] = useGuides();

  const handleDetails = (id) => {
    <Link to={`/details/${id}`}></Link>;
  };

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      className="bg-gray-100 py-12"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="w-10/12 mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Tourism and Travel Guide
        </h2>
        <Tabs>
          <TabList className="flex justify-center gap-4 mb-8">
            <Tab
              className="px-6 py-2 border text-black rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white focus:outline-none"
              selectedClassName="bg-primary text-white border-primary"
            >
              Our Packages
            </Tab>
            <Tab
              className="px-6 py-2 border text-black rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white focus:outline-none"
              selectedClassName="bg-primary text-white border-primary"
            >
              Meet Tour Guides
            </Tab>
          </TabList>
          <TabPanel>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-20">
              {tours.map((tour) => (
                <Card
                  key={tour._id}
                  tour={tour}
                  handleDetails={handleDetails}
                />
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
              {guides.map((guide) => (
                <TourGuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default Tourism;

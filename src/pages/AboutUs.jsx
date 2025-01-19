import { Helmet } from "react-helmet";

const AboutUs = () => {
  const stats = [
    { count: 540, label: "ROOMS" },
    { count: 3, label: "RESTAURANTS" },
    { count: 682, label: "STAFFS" },
    { count: 2, label: "SWIM. POOLS" },
  ];
  const awards = [
    {
      image: "https://i.ibb.co.com/4fQt24W/award1-1.png",
      label: "#1 Global Choice",
    },
    {
      image: "https://i.ibb.co.com/MyzhZtH/award2.png",
      label: "#2 Top Quality",
    },
    {
      image: "https://i.ibb.co.com/YTSFqNV/genuine-removebg-preview.png",
      label: "#3 Genuine Quality",
    },
  ];
  return (
    <section className="pt-28">
      <Helmet>
        <title>About | Roomify</title>
      </Helmet>
      <div className="bg-gray-50 py-12">
        <div className="w-11/12 mx-auto">
          <h2 className="text-3xl font-bold text-gray-600">About Us</h2>
          <h3 className="text-gray-500">Home / About us</h3>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-16 lg:flex justify-between gap-8">
        <div className="lg:w-1/2">
          <h3 className="text-3xl font-bold text-primary mb-2">
            ROOMIFY SINCE 1992
          </h3>
          <p className="text-gray-600 text-xl">
            High quality accommodation services.
          </p>
          <p className="text-gray-500 leading-relaxed text-lg mt-12 text-justify">
            Roomify Hotel is a sanctuary of elegance and comfort, designed to
            cater to the diverse needs of travelers. Each room blends modern
            aesthetics with cozy furnishings, ensuring a relaxing stay. Guests
            can indulge in world-class amenities, including spacious suites,
            high-speed Wi-Fi, and plush bedding, creating a perfect escape from
            the ordinary. Our commitment to detail ensures every visitor feels
            at home.
          </p>
          <p className="text-gray-500 leading-relaxed text-lg mt-3 text-justify">
            The hotel offers a wide range of services, from exquisite dining
            experiences at our on-site restaurant to rejuvenating spa
            treatments. Business travelers will appreciate our fully equipped
            meeting spaces, while leisure guests can unwind in our serene
            outdoor spaces. Roomify Hotel seamlessly combines functionality and
            luxury for a holistic guest experience.
          </p>
          <p className="text-gray-500 leading-relaxed text-lg mt-3 text-justify">
            Strategically located, Roomify Hotel provides easy access to popular
            landmarks and transport hubs, making it a prime choice for tourists
            and professionals alike. Experience personalized service and
            unmatched hospitality at Roomify Hotel.
          </p>
        </div>
        <div className="md:w-1/2 md:flex relative gap-2">
          <img
            className="lg:w-1/2 rounded-xl mt-6"
            src="https://i.ibb.co.com/Hh4L0ZD/about-2.webp"
            alt=""
          />
          <img
            className="lg:w-1/2 object-cover rounded-xl mt-6"
            src="https://i.ibb.co.com/vqL2y3S/about-1.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="mt-16 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="border-2 rounded-lg text-center text-gray-500 font-bold p-4 w-full"
          >
            <h3 className="text-3xl">{stat.count}</h3>
            <h3 className="text-2xl mt-6">{stat.label}</h3>
          </div>
        ))}
      </div>
      <div className="mt-24 w-11/12 mx-auto">
        <h2 className="text-4xl text-primary font-bold mb-12">Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="border-2 rounded-lg text-center text-gray-500 font-medium p-4 w-full"
            >
              <div className="flex flex-col items-center flex-grow">
                <img className="w-40" src={award.image} />
              </div>
              <h3 className="text-xl mt-6">{award.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

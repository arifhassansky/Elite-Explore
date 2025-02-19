import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#102d5c] text-white pt-16">
      <div className="w-11/12 mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center h-14">
              <Link to="/" className="flex-shrink-0">
                <img
                  className="h-14 w-auto"
                  src={logo}
                  alt="Elite Travels Logo"
                />
              </Link>
              <span className="text-2xl font-semibold">Elite Explore</span>
            </div>
            <p className="ml-3 text-lg text-justify">
              Experience the finest rooms for your relaxation. Join Roomify for
              a luxurious stay and relax.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Quick Links
            </h3>
            <ul>
              <li>
                <Link
                  to="/trips"
                  className="hover:text-primary transition duration-300"
                >
                  Trip
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="hover:text-primary transition duration-300"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="hover:text-primary transition duration-300"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="lg:flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Follow Us On
            </h3>
            <div className="flex mt-2 gap-2">
              <a
                to="https://www.facebook.com/arifhearthacker/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/swKMGKv/2021-Facebook-icon-svg.png"
                  alt="Facebook"
                  className="w-8 h-8 rounded-full"
                />
              </a>
              <a
                to="https://x.com/arifskypro"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/3Yd0c93/free-twitter-logo-icon-2429-thumb.png"
                  alt="Twitter"
                  className="w-8 h-8 rounded-full"
                />
              </a>
              <a
                to="https://www.linkedin.com/in/arif-hassan-8a4642317"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/b1Tvsq6/linkedin.webp"
                  alt="LinkedIn"
                  className="w-8 h-8 rounded-full"
                />
              </a>
              <a
                to="https://github.com/arifhassansky"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/b15JzW4/github.png"
                  alt="Github"
                  className="w-14 h-8 rounded-full"
                />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Contact
            </h3>
            <ul>
              <li>
                <p>Email: arifskypro@gmail.com</p>
              </li>
              <li>
                <p>Whatsapp: +8801960606195</p>
              </li>
              <li>
                <p>Address: Modammadpur, Dhaka, Bangladesh.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-4 bg-[#0c2854] px-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Md.Arif Hassan | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

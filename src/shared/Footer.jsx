import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#102d5c] text-white pt-16">
      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center h-14">
              <a href="/" className="flex-shrink-0">
                <img
                  className="h-14 w-auto"
                  src={logo}
                  alt="Elite Travels Logo"
                />
              </a>
              <span className="text-2xl font-semibold">Elite Explore</span>
            </div>
            <p className="ml-3 text-lg">
              Experience the finest rooms for your relaxation. Join Roomify for
              a luxurious stay and unmatched comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Quick Links
            </h3>
            <ul>
              <li>
                <a
                  href="/trips"
                  className="hover:text-primary transition duration-300"
                >
                  Trips
                </a>
              </li>

              <li>
                <a
                  href="/gallery"
                  className="hover:text-primary transition duration-300"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="hover:text-primary transition duration-300"
                >
                  Community
                </a>
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
                href="https://www.facebook.com/arifhearthacker/"
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
                href="https://x.com/arifskypro"
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
                href="https://www.linkedin.com/in/arif-hassan-8a4642317/"
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
                href="https://www.instagram.com/ariyan_sky/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/phDPkf7/instrgram.png"
                  alt="Instagram"
                  className="w-8 h-8 rounded-full"
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

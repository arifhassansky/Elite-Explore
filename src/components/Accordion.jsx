/* eslint-disable react/prop-types */
import { useState } from "react";

// icons
import { FaChevronDown, FaLocationDot } from "react-icons/fa6";

const Accordion = ({ destination }) => {
  const [isaccordionOpen, setIsaccordionOpen] = useState(0);

  const handleClick = (index) =>
    setIsaccordionOpen((prevIndex) => (prevIndex === index ? null : index));

  return (
    <div className="flex gap-3 flex-col w-full">
      {destination?.tour_plan?.map((accordion, index) => (
        <article key={index} className="border-b border-[#e5eaf2] rounded py-3">
          <div
            className="relative flex gap-2 cursor-pointer items-center justify-between w-full "
            onClick={() => handleClick(index)}
          >
            <h2 className="font-semibold text-xl ml-32">{accordion.title}</h2>
            <h3 className="absolute flex items-center gap-1 bg-blue-400 px-6 py-1 rounded-sm">
              <FaLocationDot className="text-red-500" /> {accordion.day}
            </h3>
            <p>
              <FaChevronDown
                className={` text-secondary transition-all duration-300 ${
                  isaccordionOpen === index && "rotate-[180deg] !text-primary"
                }`}
              />
            </p>
          </div>
          <div
            className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
              isaccordionOpen === index
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="text-secondary text-sm overflow-hidden px-6">
              {accordion.activities}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Accordion;

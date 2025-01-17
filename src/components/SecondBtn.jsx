/* eslint-disable react/prop-types */
const SecondBtn = ({ text }) => {
  return (
    <button
      type="submit"
      className="btn relative w-full inline-flex items-center justify-center px-8 py-2 overflow-hidden tracking-tighter text-xl text-white bg-secondary rounded-lg group"
    >
      <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-primary group-hover:w-full group-hover:h-full"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-300"></span>
      <span className="relative text-text group-hover:text-white">{text}</span>
    </button>
  );
};

export default SecondBtn;

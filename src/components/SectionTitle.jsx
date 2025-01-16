/* eslint-disable react/prop-types */
const SectionTitle = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      <p className="text-lg text-gray-600 mt-2">{subtitle}</p>
    </header>
  );
};

export default SectionTitle;

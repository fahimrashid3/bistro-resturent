const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center lg:my-16 md:my-10 my-6 lg:w-4/12 mx-auto">
      <p className="text-[#D99904] italic lg:text-xl text-lg lg:mb-3 md:mb-2 mb-1">
        ---{subHeading}---
      </p>
      <h3 className="lg:text-4xl text-3xl uppercase text-dark-900 dark:text-white lg:py-5 md:py-4 py-3 border-y-2 ">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;

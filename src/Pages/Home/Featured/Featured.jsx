import img from "../../../assets/home/chef-service.jpg";

const Featured = () => {
  return (
    <div
      className="lg:px-[15%] md:px-[10%] px-[5%] lg:py-20 md:py-12 py-7 lg:mt-20 md:mt-12 mt-7 rounded-lg bg-cover"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div
        className="
        bg-white dark:bg-dark-800 text-dark-900 dark:text-white lg:p-20 md:p-12 p-7 lg:space-y-8 md:space-y-5 space-y-3 rounded-lg opacity-85
        "
      >
        <h1 className="text-4xl text-center lg:font-semibold">Bistro Boss</h1>
        <p className="text-center lg:px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, libero accusamus laborum deserunt ratione dolor
          officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
          nihil iusto ducimus incidunt quibusdam nemo.
        </p>
      </div>
    </div>
  );
};

export default Featured;

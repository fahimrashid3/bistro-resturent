import img from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";

const Featured = () => {
  return (
    <div className="rounded-lg" style={{ backgroundImage: `url(${img})` }}>
      <div className="md:pt-10">
        <SectionTitle
          heading={"FROM OUR MENU"}
          subHeading={"Check it out"}
        ></SectionTitle>
      </div>
      <div className="md:flex md:space-x-10 justify-center items-center  lg:pb-20 md:pb-12 pb-8 lg:px-16 md:px-12 px-8 ">
        <div>
          <img src={img} alt="" />
        </div>
        <div className="text-white space-y-5">
          <p className="text-2xl">March 20, 2023</p>
          <p className="text-2xl uppercase">WHERE CAN I GET SOME?</p>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-warning hover:btn-neutral btn-outline ">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

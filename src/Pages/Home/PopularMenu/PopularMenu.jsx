import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";
import useMenu from "../../../hooks/useManue";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section>
      <SectionTitle
        heading={"FROM OUR MENU"}
        subHeading={"Check it out"}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 lg:gap-10 md:gap-6 gap-4">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link className="mt-5 mx flex justify-center">
        <button className="btn btn-warning hover:btn-neutral btn-outline border-0 border-b-4 ">
          View Full Menu
        </button>
      </Link>
    </section>
  );
};

export default PopularMenu;

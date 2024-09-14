import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
// import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <section>
      {title && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 lg:gap-10 md:gap-6 gap-4 lg:my-16 md:my-12 my-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      {/* <Link className="mt-5 mx flex justify-center">
        <button className="btn btn-warning hover:btn-neutral btn-outline border-0 border-b-4 ">
          View Full Menu
        </button>
      </Link> */}
    </section>
  );
};

export default MenuCategory;

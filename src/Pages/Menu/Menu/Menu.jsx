import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useManue";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const drinks = menu.filter((item) => item.category === "drinks");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <div className="lg:mb-20 md:mb-12 mb-8">
        {/* main cover  */}
        <Cover img={menuImg} title={"Oue Menu"}></Cover>

        <SectionTitle
          heading={"TODAY'S OFFER"}
          subHeading={"Don't Miss"}
        ></SectionTitle>
        {/* offered section */}

        <MenuCategory items={offered} title="offered"></MenuCategory>

        {/*dessert section*/}
        <MenuCategory
          items={dessert}
          title="dessert"
          coverImg={dessertImg}
        ></MenuCategory>

        {/*pizza section*/}
        <MenuCategory
          items={pizza}
          title="pizza"
          coverImg={pizzaImg}
        ></MenuCategory>

        {/*salad section*/}
        <MenuCategory
          items={salad}
          title="salad"
          coverImg={saladImg}
        ></MenuCategory>

        {/*soup section*/}
        <MenuCategory
          items={soup}
          title="soup"
          coverImg={soupImg}
        ></MenuCategory>
        {/*drinks section*/}
        <MenuCategory
          items={drinks}
          title="drinks"
          coverImg={menuImg}
        ></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;

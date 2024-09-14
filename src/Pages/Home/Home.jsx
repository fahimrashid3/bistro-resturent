import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";
import ChefRecommends from "./ChefRecommends/ChefRecommends";
import ContactNumber from "./ContactNumber/ContactNumber";
import Description from "./Description/Description";
import PopularMenu from "./PopularMenu/PopularMenu";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <Category></Category>

      <Description></Description>
      <PopularMenu></PopularMenu>
      <ContactNumber></ContactNumber>
      <ChefRecommends></ChefRecommends>
    </div>
  );
};

export default Home;

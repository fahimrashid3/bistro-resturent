import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";
import ChefRecommends from "./ChefRecommends/ChefRecommends";
import ContactNumber from "./ContactNumber/ContactNumber";
import Description from "./Description/Description";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <Category></Category>

      <Description></Description>
      <PopularMenu></PopularMenu>
      <ContactNumber></ContactNumber>
      <ChefRecommends></ChefRecommends>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;

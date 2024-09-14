// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide3.jpg";
import img4 from "../../../assets/home/slide4.jpg";
import img5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section>
      <SectionTitle
        subHeading={"From 11:00am to 10:00pm"}
        heading={"ORDER ONLINE"}
      ></SectionTitle>
      <div className="max-w-[80%] mx-auto">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="w-full" src={img1} alt="" />
            <h3 className="uppercase text-white text-4xl text-center -mt-16">
              salads
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full" src={img2} alt="" />
            <h3 className="uppercase text-white text-4xl text-center -mt-16">
              Pizzas
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full" src={img3} alt="" />
            <h3 className="uppercase text-white text-4xl text-center -mt-16">
              Soups
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full" src={img4} alt="" />
            <h3 className="uppercase text-white text-4xl text-center -mt-16">
              dess
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full" src={img5} alt="" />
            <h3 className="uppercase text-white text-4xl text-center -mt-16">
              salads
            </h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;

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
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <section>
      <SectionTitle
        subHeading={"From 11:00am to 10:00pm"}
        heading={"ORDER ONLINE"}
      ></SectionTitle>
      <div className="max-w-[80%] mx-auto">
        <Swiper
          slidesPerView={3.5}
          spaceBetween={30}
          centeredSlides={true}
          initialSlide={"initial"}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to={`/order/offered`}>
              <img className="w-full" src={img1} alt="" />
              <h3 className="uppercase text-white text-4xl text-center -mt-16">
                Offered
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/order/pizza`}>
              <img className="w-full" src={img2} alt="" />
              <h3 className="uppercase text-white text-4xl text-center -mt-16">
                Pizza
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/order/soup`}>
              <img className="w-full" src={img3} alt="" />
              <h3 className="uppercase text-white text-4xl text-center -mt-16">
                Soup
              </h3>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to={`/order/dessert`}>
              <img className="w-full" src={img4} alt="" />
              <h3 className="uppercase text-white text-4xl text-center -mt-16">
                dessert
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/order/salad`}>
              <img className="w-full" src={img5} alt="" />
              <h3 className="uppercase text-white text-4xl text-center -mt-16">
                salad
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/order/drinks`}>
              <img className="w-full" src={img5} alt="" />
              <h3 className="uppercase text-white text-4xl text-center -mt-16">
                salads
              </h3>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;

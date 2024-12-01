import orderCover from "../../../assets/order/banner2.jpg";
import useMenu from "../../../hooks/useManue";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ItemCard from "../../Shared/ItemCard/ItemCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
const Order = () => {
  // all category of food array to find the index to arrange  tab
  const categories = ["offered", "dessert", "pizza", "salad", "soup", "drinks"];

  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  //   filter items from all data
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order food</title>
      </Helmet>
      <Cover img={orderCover} title={"Order Food "}></Cover>
      <Tabs
        defaultIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index);
        }}
      >
        <div className="mx-auto grid justify-center mt-16 ">
          <TabList>
            <Tab>Offered</Tab>
            <Tab>Desserts</Tab>
            <Tab>Pizza</Tab>
            <Tab>Salad</Tab>
            <Tab>Soups</Tab>
            <Tab>Drinks</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-12 gap-0 lg:mt-16 md:mt-10 ">
            {offered.map((item) => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-12 gap-0 lg:mt-16 md:mt-10 ">
            {dessert.map((item) => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-12 gap-0 lg:mt-16 md:mt-10 ">
            {pizza.map((item) => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-12 gap-0 lg:mt-16 md:mt-10 ">
            {salad.map((item) => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-12 gap-0 lg:mt-16 md:mt-10 ">
            {soup.map((item) => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-12 gap-0 lg:mt-16 md:mt-10 ">
            {drinks.map((item) => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;

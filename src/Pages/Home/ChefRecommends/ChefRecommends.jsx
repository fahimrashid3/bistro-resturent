import { useEffect, useState } from "react";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import ItemCard from "../../Shared/ItemCard/ItemCard";

const ChefRecommends = () => {
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const recommends = data.filter((item) => item.category === "offered");
        setRecommends(recommends);
      });
  }, []);
  return (
    <div>
      <SectionTitle
        heading={"CHEF RECOMMENDS"}
        subHeading={"Should Try"}
      ></SectionTitle>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-5 md:gap-8 px-5 md:px-0 space-y-8 md:space-y-0">
        {recommends.map((item) => (
          <ItemCard key={item._id} item={item}></ItemCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommends;

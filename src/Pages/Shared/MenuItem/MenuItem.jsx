const MenuItem = ({ item }) => {
  const { name, price, recipe, image } = item;
  return (
    <div className="flex space-x-2 px-4 md:px-0">
      <img
        src={image}
        className="rounded-b-full rounded-r-full w-32 h-28 md:mr-2"
        alt=""
      />
      <div>
        <h2 className="uppercase text-xl font-semibold">{name}---------</h2>
        <p>{recipe}</p>
      </div>
      <p className="text-[#D99904]">${price}</p>
    </div>
  );
};

export default MenuItem;

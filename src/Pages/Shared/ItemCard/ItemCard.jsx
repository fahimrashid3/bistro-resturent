const ItemCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="card card-compact bg-base-100 shadow-xl text-center">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p
        className="
         btn btn-ghost bg-dark-900 dark:bg-white  text-white dark:text-dark-900 hover:text-[#D99904] text-sm hover:text-lg absolute right-4 top-4 px-2 py-1 rounded-lg"
      >
        $ {price}
      </p>
      <div className="card-body">
        <h2 className="font-bold text-xl text-center">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-warning hover:btn-neutral btn-outline border-0 border-b-4 ">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

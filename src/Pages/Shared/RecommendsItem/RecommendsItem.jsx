const RecommendsItem = ({ item }) => {
  const { name, image, recipe } = item;
  return (
    <div className="card card-compact bg-base-100 shadow-xl text-center">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="font-bold text-xl text-center">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-warning text-black dark:text-white hover:btn-neutral hover:text-yellow-500 ">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendsItem;

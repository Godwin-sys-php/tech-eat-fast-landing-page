import "./Dish.css";

const Dish = ({ dish, onClick }) => {
  return (
    <div className="card-container" onClick={() => onClick(dish.idDish)}>
      <div
        style={{
          width: "50%",
          backgroundImage: `url("${dish.imageUrl}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 30
        }}
      ></div>
      <div className="card-content">
        <h3 className="card-title">{dish.name}</h3>
        <h4 className="card-subtitle">{dish.price}$</h4>
      </div>
    </div>
  );
};

export default Dish;

import PropTypes from 'prop-types';
const Cart = ({ selectedActors, totalCost, costRemaining }) => {
  return (
    <div className="w-1/4 text-white space-y-3 border-2 border-white p-4 rounded-lg self-start">
      <p className="text-2xl:">Total Cost: ${totalCost}</p>
      <p className="text-2xl">Cost Remaining: ${costRemaining}</p>
      <h4 className=" text-3xl">Selected Actors</h4>
      <ol>
        {selectedActors.map((actor) => (
          <li className="list-decimal list-inside" key={actor.id}>
            {actor.name}
          </li>
        ))}
      </ol>
    </div>
  );
};

Cart.propTypes = {
  selectedActors: PropTypes.array.isRequired,
  totalCost: PropTypes.number,
  costRemaining: PropTypes.number,
};

export default Cart;

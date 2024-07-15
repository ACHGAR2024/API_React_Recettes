import PropTypes from 'prop-types';

function IngredientItem({ ingredient }) {
  return (
    <li className="mb-2">
      <h3 className="text-xl font-bold">{ingredient.nom}</h3>
    </li>
  );
}

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
  }).isRequired,
};

export default IngredientItem;

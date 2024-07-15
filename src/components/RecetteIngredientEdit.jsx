import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RecetteIngredientEdit({ ingredientData, onSave, onCancel }) {
  const [recetteId, setRecetteId] = useState(ingredientData.recette_id);
  const [ingredientId, setIngredientId] = useState(ingredientData.ingredient_id);
  const [quantite, setQuantite] = useState(ingredientData.quantite);
  const [recettes, setRecettes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/recettes')
      .then(response => {
        setRecettes(response.data);
      })
      .catch(error => console.error(error));

    axios.get('http://127.0.0.1:8000/api/ingredients')
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://127.0.0.1:8000/api/recette-ingredients/${ingredientData.id}`, {
      recette_id: recetteId,
      ingredient_id: ingredientId,
      quantite
    })
.then(response => {
  onSave(response.data);
})
    .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="recetteId" className="block text-sm font-medium text-gray-700">Titre de Recette</label>
        <select
          id="recetteId"
          value={recetteId}
          onChange={(e) => setRecetteId(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select a Recette</option>
          {recettes.map(recette => (
            <option key={recette.id} value={recette.id}>{recette.titre}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="ingredientId" className="block text-sm font-medium text-gray-700">Nom Ingrédient</label>
        <select
          id="ingredientId"
          value={ingredientId}
          onChange={(e) => setIngredientId(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select an Ingredient</option>
          {ingredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.nom}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="quantite" className="block text-sm font-medium text-gray-700">Quantité</label>
        <input
          type="text"
          id="quantite"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex justify-end z-50">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 mt-2 p-2 bg-gray-500 text-white rounded-md"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

RecetteIngredientEdit.propTypes = {
  ingredientData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RecetteIngredientEdit;

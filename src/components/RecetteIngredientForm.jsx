import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RecetteIngredientForm({ recetteId, onClose }) {
  const [ingredientId, setIngredientId] = useState('');
  const [quantite, setQuantite] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/ingredients')
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8000/api/recette-ingredients', {
      recette_id: recetteId,
      ingredient_id: ingredientId,
      quantite: quantite
    })
      .then(response => {
        console.log(response.data);
        
        setIngredientId('');
        setQuantite('');
        onClose(); // Ferme le formulaire après la soumission réussie
        window.location.reload();
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="ingredientId" className="block text-sm font-medium text-gray-700">Ingredient</label>
        <select
          id="ingredientId"
          value={ingredientId}
          onChange={(e) => setIngredientId(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Sélectionnez un ingrédient</option>
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
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">Ajouter Ingredient Recette</button>
      <button type="button" onClick={onClose} className="mt-2 ml-2 p-2 bg-gray-500 text-white rounded-md">Annuler</button>
    </form>
  );
}

RecetteIngredientForm.propTypes = {
  recetteId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecetteIngredientForm;

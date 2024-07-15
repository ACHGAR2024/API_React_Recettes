import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function IngredientForm({ ingredient, onSave, onCancel }) {
  const [nom, setNom] = useState(ingredient ? ingredient.nom : '');

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = ingredient ? `http://127.0.0.1:8000/api/ingredients/${ingredient.id}` : 'http://127.0.0.1:8000/api/ingredients';
    const method = ingredient ? 'put' : 'post';

    axios[method](apiUrl, { nom })
      .then(response => {
        onSave(response.data);
        setNom('');
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="mt-2 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
        {ingredient ? 'Modifier' : 'Ajouter'}
      </button>
      <button type="button" onClick={onCancel} className="mt-2 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md ml-2">
        Annuler
      </button>
    </form>
  );
}

IngredientForm.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    nom: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default IngredientForm;

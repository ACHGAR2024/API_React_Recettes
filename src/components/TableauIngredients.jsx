import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from '../components/Modal';
import RecetteIngredientEdit from './RecetteIngredientEdit';

function TableauIngredients({ shouldRefresh }) {
  const [recettesIngredients, setRecettesIngredients] = useState([]);
  const [recettes, setRecettes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const fetchRecettesIngredients = async () => {
    try {
      const ingredientsResponse = await axios.get('http://127.0.0.1:8000/api/recette-ingredients');
      const recettesResponse = await axios.get('http://127.0.0.1:8000/api/recettes');
      const ingredientsDataResponse = await axios.get('http://127.0.0.1:8000/api/ingredients');

      setRecettesIngredients(ingredientsResponse.data);
      setRecettes(recettesResponse.data);
      setIngredients(ingredientsDataResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecettesIngredients();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchRecettesIngredients();
    }
  }, [shouldRefresh]);

  const handleDeleteClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/recette-ingredients/${selectedIngredient.id}`);
      setDeleteOpen(false);
      fetchRecettesIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditOpen(true);
  };

  const handleEditSave = () => {
    setEditOpen(false);
    fetchRecettesIngredients();
  };

  const handleEditCancel = () => {
    setEditOpen(false);
  };

  const getRecetteTitle = (recetteId) => {
    const recette = recettes.find((r) => r.id === recetteId);
    return recette ? recette.titre : 'Unknown';
  };

  const getIngredientName = (ingredientId) => {
    const ingredient = ingredients.find((i) => i.id === ingredientId);
    return ingredient ? ingredient.nom : 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b border-gray-200">ID</th>
            <th className="px-6 py-3 border-b border-gray-200">Titre de Recette</th>
            <th className="px-6 py-3 border-b border-gray-200">Nom Ingrédient</th>
            <th className="px-6 py-3 border-b border-gray-200">Quantité</th>
            <th className="px-6 py-3 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recettesIngredients.map((ingredient) => (
            <tr key={ingredient.id} className="text-gray-700">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{ingredient.id}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{getRecetteTitle(ingredient.recette_id)}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{getIngredientName(ingredient.ingredient_id)}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{ingredient.quantite}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                <button
                  onClick={() => handleEditClick(ingredient)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteClick(ingredient)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-lg">Êtes-vous sûr de vouloir supprimer cet ingrédient?</p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDeleteConfirm}
            >
              Oui
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setDeleteOpen(false)}
            >
              Non
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={handleEditCancel}>
        {selectedIngredient && (
          <RecetteIngredientEdit
            ingredientData={selectedIngredient}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        )}
      </Modal>
    </div>
  );
}

TableauIngredients.propTypes = {
  shouldRefresh: PropTypes.bool.isRequired,
};

export default TableauIngredients;

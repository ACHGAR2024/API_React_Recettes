import { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientForm from './IngredientForm';
import ConfirmationModal from './ConfirmationModal';

function IngredientList() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIngredientClick = () => {
    setIsAddingIngredient(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`);
      fetchIngredients();
      setShowConfirmationModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    
    fetchIngredients();
    setSelectedIngredient(null);
    setIsAddingIngredient(false);
};

  const handleCancel = () => {
    setSelectedIngredient(null);
    setIsAddingIngredient(false);
  };

  const confirmDelete = (ingredient) => {
    setIngredientToDelete(ingredient);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    if (ingredientToDelete) {
      handleDelete(ingredientToDelete.id);
    }
  };

  const handleCancelDelete = () => {
    setIngredientToDelete(null);
    setShowConfirmationModal(false);
  };

  return (
    <div className="flex flex-col items-center mt-4 mb-20">
      <h2 className="text-2xl font-bold mb-4">Liste des ingrédients Cuisine Marocaine</h2>
      <button
        onClick={handleAddIngredientClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mb-4"
      >
        Ajouter un ingrédient
      </button>

      {selectedIngredient || isAddingIngredient ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-96 p-4">
            <IngredientForm
              ingredient={selectedIngredient}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      ) : (
      <div className="overflow-x-auto mb-24">
        <table className="min-w-full bg-white border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-200">Nom</th>
              <th className="px-6 py-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(ingredient => (
              <tr key={ingredient.id} className="text-gray-700">
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{ingredient.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex justify-around">
                  <button
                    onClick={() => setSelectedIngredient(ingredient)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded m-10"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => confirmDelete(ingredient)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-10"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          message={`Voulez-vous supprimer l'ingrédient "${ingredientToDelete?.nom}" ?`} 
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete} 
        />
      )}
    </div>
  );
} 

export default IngredientList;
 


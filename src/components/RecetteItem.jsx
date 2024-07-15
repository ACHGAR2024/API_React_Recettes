// RecetteItem.jsx

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecetteIngredientForm from './RecetteIngredientForm';
import RecetteFormEdit from './RecetteFormEdit';

function RecetteItem({ recette, onDelete }) {
  const imageUrl = recette.photo ? `http://127.0.0.1:8000/storage${recette.photo}` : null;
  const [isEditingRecette, setIsEditingRecette] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  const fetchRating = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ratings/${recette.id}`);
      const ratings = response.data;
      if (ratings.length) {
        setRating(ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length);
        const userRating = ratings.find(r => r.user_id === 1); // Remplacez `1` par l'ID de l'utilisateur actuel
        if (userRating) setUserRating(userRating.score);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [recette.id]); 
  const handleRating = async (score) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/ratings', {
        recette_id: recette.id,
        score
      });
      setUserRating(score);
      fetchRating();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  const handleEditRecetteClose = () => {
    setIsEditingRecette(false);
  };

  const handleEditRecette = () => {
    setIsEditingRecette(true);
  };

  const handleEditRecetteSave = () => {
    setIsEditingRecette(false);
    // Rafraîchir la page /recettes après la modification
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden slide-in">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={recette.titre}
          className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110"
        />
      ) : (
        <img
          src={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`}
          alt={recette.titre}
          className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110"
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{recette.titre}</h3>
        <p className="text-gray-600 mb-6">{recette.description}</p>

        {recette.ingredients && (
          <div className="bg-gray-200 rounded-lg shadow-md p-6 mb-8">
            <h4 className="text-lg font-bold mb-4">Ingrédients</h4>
            <button onClick={toggleForm}>
              <img src="https://img.icons8.com/?size=25&id=NNitpwCxd7de&format=png&color=000000" alt="Ingredients" />
            </button>
            {isFormOpen && (
              <RecetteIngredientForm
                recetteId={recette.id}
                onClose={toggleForm}
              />
            )}
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 text-left">Ingrédient</td>
                  <td className="py-2 text-right">Quantité</td>
                </tr>
                {recette.ingredients.map((ingredient, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-2 pr-4 text-left">{ingredient.ingredient.nom}</td>
                    <td className="py-2 text-right">
                      <span className="font-semibold">{ingredient.quantite}</span> {ingredient.ingredient.unite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center">
          <p className="text-gray-600 text-sm mr-2">Note: {rating.toFixed(1)} / 5</p>
          {[1, 2, 3, 4, 5].map(score => (
            <button
              key={score}
              onClick={() => handleRating(score)}
              className={`mx-1 ${userRating >= score ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              ★
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <a onClick={handleEditRecette} className="cursor-pointer">
            <img
              src="https://img.icons8.com/?size=30&id=igrSBBsPDJor&format=png&color=000000"
              alt="Edit"
            />
          </a>
          <a onClick={() => onDelete(recette)} className="cursor-pointer">
            <img
              src="https://img.icons8.com/?size=30&id=zcKASRdEX01m&format=png&color=000000"
              alt="Delete"
            />
          </a>
        </div>
        <p className="text-gray-600 text-left mt-5">{recette.instructions}</p>

        {isEditingRecette && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-96">
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Modifier la recette</h3>
                <RecetteFormEdit
                  recette={recette}
                  onSave={handleEditRecetteSave}
                  onCancel={handleEditRecetteClose}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

RecetteItem.propTypes = {
  recette: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    photo: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredient: PropTypes.shape({
          id: PropTypes.number.isRequired,
          nom: PropTypes.string.isRequired,
          unite: PropTypes.string,
        }).isRequired,
        quantite: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RecetteItem;

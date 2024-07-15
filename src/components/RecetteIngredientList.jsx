import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecetteItem from './RecetteItem';

function RecetteIngredientList({ onEdit, onAddIngredient, onDelete, shouldRefresh }) {
  const [recettes, setRecettes] = useState([]);

  const fetchRecettes = async () => {
    try {
      const recettesResponse = await axios.get('http://127.0.0.1:8000/api/recettes');
      const ingredientsResponse = await axios.get('http://127.0.0.1:8000/api/recette-ingredients');

      const recettesData = recettesResponse.data;
      const ingredientsData = ingredientsResponse.data;

      const recettesWithIngredients = recettesData.map(recette => {
        const recetteIngredients = ingredientsData.filter(ingredient => 
          ingredient.recette_id === recette.id
        );
        return { ...recette, ingredients: recetteIngredients };
      });

      setRecettes(recettesWithIngredients);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecettes();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchRecettes();
    }
  }, [shouldRefresh]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recettes.map(recette => (
        <RecetteItem
          key={recette.id}
          recette={recette}
          onEdit={onEdit}
          onAddIngredient={onAddIngredient}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

RecetteIngredientList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  shouldRefresh: PropTypes.bool.isRequired,
};

export default RecetteIngredientList;

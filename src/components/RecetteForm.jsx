import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RecetteForm({ onSave, onCancel }) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('instructions', instructions);

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/recettes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSave(); // onSave pour indiquer que la sauvegarde est terminée
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          id="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end z-50">
        <button onClick={onCancel} type="button" className="mr-2 mt-2 p-2 bg-gray-500 text-white rounded-md">
          Annuler
        </button>
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

RecetteForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RecetteForm;

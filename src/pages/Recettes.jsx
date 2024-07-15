import { useState, useEffect } from 'react';
import axios from 'axios';
import RecetteIngredientList from '../components/RecetteIngredientList';
import RecetteForm from '../components/RecetteForm';
import Modal from '../components/Modal'; 

const Recettes = () => {
  const [isAddOpen, setAddOpen] = useState(false);
  const [isAddIngredientOpen, setAddIngredientOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedRecette, setSelectedRecette] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleAdd = (recette) => {
    setSelectedRecette(recette);
    setAddOpen(true);
  };

  const handleAddRecetteClose = () => {
    setAddOpen(false);
  };

  const handleAddRecetteSave = async () => {
    setAddOpen(false); // Ferme la modal après la sauvegarde
    // Rafraîchir la page /recettes après la modification
    window.location.reload();
  };

  const handleAddIngredient = (recette) => {
    setSelectedRecette(recette);
    setAddIngredientOpen(true);
  };

  const handleDelete = (recette) => {
    setSelectedRecette(recette);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/recettes/${selectedRecette.id}`);
      setDeleteOpen(false);
      setShouldRefresh(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (shouldRefresh) {
      // Actions à prendre lorsque shouldRefresh est vrai, par exemple recharger les données
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  return (
    <div className="mb-32">
      <div style={{ position: 'fixed', top: 100, left: 10, zIndex: 100 }}>
        <a onClick={() => handleAdd(null)} className="cursor-pointer">
          <img
            src="https://img.icons8.com/?size=60&id=42876&format=png&color=000000"
            alt="Ajouter une recette"
          />
        </a>
      </div>
      <RecetteIngredientList
        shouldRefresh={shouldRefresh}
        onAdd={handleAdd}
        onAddIngredient={handleAddIngredient}
        onDelete={handleDelete}
      />

      <Modal isOpen={isAddOpen} onClose={handleAddRecetteClose}>
        <RecetteForm onSave={handleAddRecetteSave} onCancel={handleAddRecetteClose} />
      </Modal>

      <Modal isOpen={isAddIngredientOpen} onClose={() => setAddIngredientOpen(false)}>
        {/* Ajoutez ici le formulaire pour ajouter des ingrédients si nécessaire */}
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-lg">Êtes-vous sûr de vouloir supprimer cette recette?</p>
          <div className="flex gap-2">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteConfirm}>Oui</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setDeleteOpen(false)}>Non</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Recettes;

import { useState, useEffect } from 'react';
import axios from 'axios';
import RecetteItem from './RecetteItem';

function RecetteList() {
  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/recettes')
      .then(response => {
        setRecettes(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      
<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
     
        {recettes.map(recette => (
          <RecetteItem key={recette.id} recette={recette} />
        ))}
      
      </div>
    </>
  );
}

export default RecetteList;

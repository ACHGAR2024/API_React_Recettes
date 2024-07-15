

const Nav = () => {
    

  return (
    <>
      <nav className="flex justify-between items-center z-50">
      <h1 className="text-3xl font-bold text-white">API Cuisine Marocaine</h1>
      <ul className="flex space-x-4">
        <li><a href="/" className="hover:text-amber-600 transition">Accueil</a></li>
        <li><a href="/recettes" className="hover:text-amber-600 transition">Nos Spécialités</a></li>
        <li><a href="/ingredients" className="hover:text-amber-600 transition">Liste Ingredients</a></li>
        <li><a href="/ingredients_recette" className="hover:text-amber-600 transition">Tableau Ingredients</a></li>
        
      </ul>
    </nav>
    </>
  );
};



export default Nav;

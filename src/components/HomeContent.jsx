import PropTypes from 'prop-types';
const HomeContent = () => {
  const SpecialtyCard = ({ title, img }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden slide-in">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p>Une délicieuse spécialité marocaine pleine de saveurs.</p>
      </div>
    </div>
  );
  
  return (
    <div className="homeContent">
     <section className="text-center py-0 fade-in">
    <h2 className="text-5xl font-bold mb-4">Découvrez la Cuisine Marocaine</h2>
    <p className="text-xl mb-8">Des saveurs authentiques et des plats traditionnels</p>
    <a href="/recettes" className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition">Voir Nos recettes</a>
  </section>
  <section id="specialties" className="py-5 mb-20">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SpecialtyCard title="Tajine" img="https://img.cuisineaz.com/660x660/2013/12/20/i59381-photo-de-tajine-d-agneau-aux-fruits-secs.webp" />
      <SpecialtyCard title="Couscous" img="https://img.cuisineaz.com/660x660/2016/04/28/i110965-couscous-royal.webp" />
      <SpecialtyCard title="Pastilla" img="https://img.cuisineaz.com/660x660/2016/06/23/i97764-pastilla-au-poulet.webp" />
    </div>
  </section>
 
      </div>
  );
};

HomeContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default HomeContent;


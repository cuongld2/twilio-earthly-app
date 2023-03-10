import AllPlaces from '../../src/components/places/places-page';

const PlacesPage = ({ data }) => {
  return <AllPlaces data={data} />;
};

export default PlacesPage;

export async function getStaticProps() {
  const { places_categories } = await import('/data/data.json');
  return {
    props: {
      data: places_categories,
    },
  };
}

import SinglePlace from '../../../src/components/places/single-place';

const PlacePage = ({ data }) => <SinglePlace data={data} />;

export default PlacePage;

export async function getStaticPaths() {
  const data = await import('/data/data.json');
  const allPlaces = data.allPlaces;

  const allPaths = allPlaces.map((path) => {
    return {
      params: {
        detail: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;
  const { allPlaces } = await import('/data/data.json');
  const placeData = allPlaces.find((ev) => id === ev.id);

  return {
    props: { data: placeData },
  };
}

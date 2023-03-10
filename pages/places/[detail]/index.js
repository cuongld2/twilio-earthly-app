import DetailPlace from '../../../src/components/places/detailPlace';

const PlacesDetailPage = ({ data, pageName }) => <DetailPlace data={data} pageName={pageName} />;

export default PlacesDetailPage;

export async function getStaticPaths() {
  const { places_categories } = await import('/data/data.json');
  const allPaths = places_categories.map((ev) => {
    return {
      params: {
        detail: ev.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.detail;
  const { allPlaces } = await import('/data/data.json');

  const data = allPlaces.filter((ev) => ev.city === id);

  return { props: { data, pageName: id } };
}

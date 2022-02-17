const URL = 'https://swapi.dev/api/planets/';

const fetchData = async (page = 1) => {
  const url = `${URL}?page=${page}`;
  const res = await fetch(url);
  return res.json();
};

export const columns = [
  {
    name: 'Name',
    key: 'name'
  },
  {
    name: 'Population',
    key: 'population'
  },
  {
    name: 'Diameter',
    key: 'diameter'
  },
  {
    name: 'Rotation Period',
    key: 'rotation_period'
  },
  {
    name: 'Surface Water',
    key: 'surface_water'
  }
];

export default fetchData;

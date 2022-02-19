const URL = 'https://swapi.dev/api/planets/';

export const fetchData = async (page = 1, itemsPerPage = 10) => {
  const url = `${URL}?page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  
  return {
    data: data.results,
    totalItems: data.count,
    itemsPerPage: itemsPerPage
  };
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

// const URL = 'https://swapi.dev/api/planets/';
const BASE_URL = 'https://api.github.com/search/repositories';

export const fetchData = async (text) => {
  const itemsPerPage = 100;

  const url = `${BASE_URL}?q=${text}&per_page=${itemsPerPage}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    data: data.items,
    totalItems: data.items.length
  };
};

export const columns = [
  {
    name: 'Name',
    key: 'name',
    link_key: 'html_url'
  },
  {
    name: 'User',
    key: 'owner.login',
    link_key: 'owner.html_url'
  },
  {
    name: '🍴 Forks',
    key: 'forks'
  },
  {
    name: '🌟 Stars',
    key: 'stargazers_count'
  },
  {
    name: '🔕 Issues',
    key: 'open_issues'
  }
];

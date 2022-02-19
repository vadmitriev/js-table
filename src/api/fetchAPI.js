// const URL = 'https://swapi.dev/api/planets/';
const URL = 'https://api.github.com/search/repositories?q=react&per_page=100';

export const fetchData = async () => {
  const itemsPerPage = 10;

  const res = await fetch(URL);
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
    link_key: 'html_url',
  },
  {
    name: 'User',
    key: 'owner.login'
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

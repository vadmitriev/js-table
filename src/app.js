// import { useState, useEffect } from './notReact';
// import Spinner from './components/Spinner/Spinner';
// import Table from './components/Table/Table';

// import { saveToLocalStorage, getFromLocalStorage } from './utils/utils.js';

// const LC_KEY = 'table';

// const App = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const initData = getFromLocalStorage(LC_KEY);
//   const [data, setData] = useState(initData);

//   useEffect(() => {
//     setIsLoading(true);

//     setData(data);
//     setIsLoading(false);
//   }, [data]);

//   if (isLoading) {
//     return Spinner();
//   }

//   return Table();
// };

// export default App;

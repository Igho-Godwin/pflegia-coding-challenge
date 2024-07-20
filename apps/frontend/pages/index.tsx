import { useEffect, useState } from 'react';
import { PizzaCard } from '../components/pizza-card';

import Pizza from '../types/Pizza';
import useFetch from '../hooks/useFetch';
import MetaDataType from '../types/MetaDataType';

export function Index() {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [metaData, setMetaData] = useState<MetaDataType | null>(null);

  const {
    data: dataFetched,
    loading: loadingFetched,
    error: errorFetched,
    metaData: metaDataFetched,
  } = useFetch<{data:Pizza[]}>(
    `${process.env.NEXT_PUBLIC_API_URL}all?page=1&take=10&order=DESC`
  );
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    if (dataFetched) {
      setPizzas(dataFetched.data);
    }
    setLoading(loadingFetched);
    setError(errorFetched);
    setMetaData(metaDataFetched);
    
  }, [dataFetched, loadingFetched, errorFetched, metaDataFetched]);

 




  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFind: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const pizzasTemp = [...pizzas];
    const filteredPizza = pizzasTemp.filter((pizza) => {
      if (pizza.name.toUpperCase().includes(searchInput.toUpperCase())) {
        return true;
      }
      return pizza.ingredients.some((ingredient) => {
        if (ingredient.toUpperCase().includes(searchInput.toUpperCase())) {
          return true;
        }
      });
    });
    filteredPizza.sort((a, b) => b.rating - a.rating);

    setPizzas(filteredPizza);
  };

  const fetchMore = async () => {
    if (metaData?.page != undefined) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}all?page=${
        metaData.page + 1
      }&take=10&order=DESC`;

      try {
        const res = await fetch(url);
        const dataTemp = await res.json();
        const dataInitialState = [...pizzas];
        dataTemp && setPizzas([...dataInitialState, ...dataTemp.data]);
        dataTemp?.meta && setMetaData(dataTemp.meta);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return 'Loading...';
  } 
  
  if (error) {
    return error;
  }

  if (pizzas?.length === 0) {
    return 'No data';
  }
  else {
    return (
      <>
        <form className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for Pizzas, Ingredients..."
              required
              onChange={handleSearchInput}
            />

            <button
              onClick={handleFind}
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800"
            >
              Find!
            </button>
          </div>
        </form>
        <div className="mt-8 grid grid-cols-4 gap-10">
          {pizzas?.length > 0 &&
            pizzas?.map((pizza) => <PizzaCard key={pizza.name} {...pizza} />)}
        </div>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          {metaData?.hasNextPage && (
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={fetchMore}
            >
              Load More
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Index;

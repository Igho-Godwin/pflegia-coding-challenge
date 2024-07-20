import { createContext, useEffect, useState } from 'react';

import Pizza from '../types/Pizza';
import MetaDataType from '../types/MetaDataType';
import useFetch from '../hooks/useFetch';

export const PizzaContext = createContext<{
  data: Pizza[];
  loading: boolean;
  error: string;
  metaData: MetaDataType | null;
  fetchMore: () => void;
}>({
  data: [],
  loading: false,
  error: '',
  metaData: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchMore: () => {},
});

export const PizzaContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [metaData, setMetaData] = useState<MetaDataType | null>(null);

  const {
    data: dataFetched,
    loading: loadingFetched,
    error: errorFetched,
    metaData: metaDataFetched,
  } = useFetch('http://localhost:3000/api/pizza/all?page=1&take=10&order=DESC');
  useEffect(() => {
    setData(dataFetched);
    setLoading(loadingFetched);
    setError(errorFetched);
    setMetaData(metaDataFetched);
  }, [dataFetched, loadingFetched, errorFetched, metaDataFetched]);

  const fetchMore = async () => {
    if (metaData?.page != undefined) {
      const url = `http://localhost:3000/api/pizza/all?page=${
        metaData.page + 1
      }&take=10&order=DESC`;

      try {
        const res = await fetch(url);
        const dataTemp = await res.json();
        const dataInitialState = [...data];
        dataTemp && setData([...dataInitialState, ...dataTemp.data]);
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

  const pizzaContextData = { data, loading, error, metaData, fetchMore };

  return (
    <PizzaContext.Provider value={pizzaContextData}>
      {children}
    </PizzaContext.Provider>
  );
};

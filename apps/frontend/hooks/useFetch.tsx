import { useEffect, useState } from 'react';
import MetaDataType from '../types/MetaDataType';

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<[]>([]);
  const [metaData, setMetaData] = useState<MetaDataType | null>(null);

  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      data && setData(data.data);
      data?.meta && setMetaData(data.meta);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error, metaData };
};

export default useFetch;

import { useEffect, useState } from 'react';
import MetaDataType from '../types/MetaDataType';

function useFetch<T>(url: string, option?: { enabled: boolean }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<T>();
  const [metaData, setMetaData] = useState<MetaDataType | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        data && setData(data);
        data?.meta && setMetaData(data.meta);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (option) {
      if (option.enabled) {
        getData();
      }
    } else {
      getData();
    }
  }, [option, url]);

  return { data, loading, error, metaData };
}

export default useFetch;

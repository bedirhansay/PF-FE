import { useEffect, useState } from "react";
import { callApi } from "../Actions";

export interface FetchResult<T> {
  data: T | null;
  loading: boolean;
}

export const useFetch = <T>({
  method,
  path,
}: {
  method: string;
  path: string;
}): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await callApi({
          method: method,
          path: path,
        });

        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {};
  }, [method, path]);

  return { data, loading };
};

import { useEffect, useState } from "react";
import { callApi } from "../actions";

export const useFetch = ({
  method,
  path,
}: {
  method: string;
  path: string;
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await callApi({
        method: method,
        path: path,
      });
      setData(data);
      setLoading(false);
    };
    fetchData();

    return () => {};
  }, []);
  return { data, loading };
};

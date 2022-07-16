import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = "https://opentdb.com/"

interface Props {
  urlApi: string;
}

const ResponseTransformation = ({ urlApi }: Props) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(urlApi)
        .then((res) => setResponse(res.data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
    fetchData();
  }, [urlApi]);

  return { response, error, loading }
};

export default ResponseTransformation;

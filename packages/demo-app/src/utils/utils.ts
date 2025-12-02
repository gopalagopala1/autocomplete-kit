export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export const apiUrl = 'https://rickandmortyapi.com/api/character';

export const fetchResults = async (query: string): Promise<Character[]> => {
  const response = fetch(`${apiUrl}/?gender=${query}`);
  const data = await (await response).json();
  return data.results;
};

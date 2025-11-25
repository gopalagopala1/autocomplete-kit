import { UseAutocompleteOptions } from './types';
import { useState } from 'react';

export const useAutocomplete = <T>(options: UseAutocompleteOptions<T>) => {
  const { fetchResults } = options;

  const [results, setResults] = useState<T[]>([]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    const results = await fetchResults(query);
    setResults(results);
  };

  return { results, onChange };
};

import { useState } from 'react';
import type { UseAutocompleteOptions } from './types';

export const useAutocomplete = <T>(options: UseAutocompleteOptions<T>) => {
  const { fetchResults, minLength = 1 } = options;

  const [value, setValue] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (query.length < minLength) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const newResults = await fetchResults(query);
    setResults(newResults);
    setIsLoading(false);
  };

  return {
    value,
    results,
    isLoading,
    onChange,
    setValue,
  };
};

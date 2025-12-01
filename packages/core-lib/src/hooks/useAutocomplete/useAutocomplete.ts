import { useState, useRef } from 'react';
import type { UseAutocompleteOptions } from './types';

export const useAutocomplete = <T>(options: UseAutocompleteOptions<T>) => {
  const { fetchResults, minLength = 1, debounceTime = 300 } = options;

  const [value, setValue] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < minLength) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      const newResults = await fetchResults(query);
      setResults(newResults);
      setIsLoading(false);
    }, debounceTime);
  };

  return {
    value,
    results,
    isLoading,
    onChange,
    setValue,
  };
};

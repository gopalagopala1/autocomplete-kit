import { useState, useRef, useEffect } from 'react';
import type { UseAutocompleteOptions, UseAutocompleteResults } from './types';

export const useAutocomplete = <T>({
  fetchResults,
  minLength = 1,
  debounceTime = 300,
}: UseAutocompleteOptions<T>): UseAutocompleteResults<T> => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    setError(null);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < minLength) {
      setResults([]);
      setIsLoading(false);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const newResults = await fetchResults(query, controller.signal);

        setResults(newResults);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log(`[Graceful Exit] Request for "${query}" cancelled.`);
        } else {
          console.error('[API Error]', err);
          setError(err);
          setResults([]);
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setIsLoading(false);
        }
      }
    }, debounceTime);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return {
    value,
    results,
    isLoading,
    error,
    onChange,
    setValue,
  };
};

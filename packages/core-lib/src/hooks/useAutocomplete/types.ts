export interface UseAutocompleteOptions<T> {
  fetchResults: (query: string, signal: AbortSignal) => Promise<T[]>;
  minLength?: number;
  debounceTime?: number;
}

export interface UseAutocompleteResults<T> {
  value: string;
  isLoading: boolean;
  error: Error | null;
  results: T[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

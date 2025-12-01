export interface UseAutocompleteOptions<T> {
  fetchResults: (query: string) => Promise<T[]>;
  minLength?: number;
  debounceTime?: number;
}

export interface UseAutocompleteResults<T> {
  results: T[];
  onChange: (e: KeyboardEvent) => void;
}

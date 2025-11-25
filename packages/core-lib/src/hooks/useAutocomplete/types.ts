export interface UseAutocompleteOptions<T> {
  fetchResults: (query: string) => Promise<T[]>;
}

export interface UseAutocompleteResults<T> {
  results: T[];
  onChange: (e: KeyboardEvent) => void;
}

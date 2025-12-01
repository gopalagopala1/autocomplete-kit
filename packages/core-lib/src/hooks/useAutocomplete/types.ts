export interface UseAutocompleteOptions<T> {
  fetchResults: (query: string) => Promise<T[]>;
  minLength?: number;
}

export interface UseAutocompleteResults<T> {
  results: T[];
  onChange: (e: KeyboardEvent) => void;
}

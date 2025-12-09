import { useAutocomplete } from '../../core-lib/src/hooks/useAutocomplete/useAutocomplete';
import { fetchResults } from './utils/utils';

function App() {
  const { results, onChange } = useAutocomplete({
    fetchResults,
    minLength: 2,
    debounceTime: 500,
  });

  return (
    <div style={{ width: 300, margin: '31px auto' }}>
      <input
        type="text"
        placeholder="Search fruit..."
        onChange={onChange}
        style={{ width: '100%', padding: 8 }}
      />

      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useAutocomplete } from 'autocomplete-kit';

function App() {
  const { results, onChange } = useAutocomplete({
    fetchResults: async (query) => {
      const items = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];
      return items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
    },
    minLength: 2,
    debounceTime: 400,
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
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

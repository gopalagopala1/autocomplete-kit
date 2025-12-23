export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export const apiUrl = 'https://rickandmortyapi.com/api/character';

export const fetchResults = async (query: string): Promise<Character[]> => {
  const response = fetch(`${apiUrl}/?gender=${query}`);
  const data = await (await response).json();
  return data.results;
};

// Keep track of calls globally
let requestCounter = 0;
let originalQuery = '';

export const mockRiggedAPI = (query: string): Promise<string[]> => {
  requestCounter++;
  const currentCount = requestCounter; // Capture the count for this specific request

  return new Promise((resolve) => {
    // LOGIC: If it's one of the first 3 requests, make it SLOW (3s)
    if (currentCount < 3) {
      originalQuery = query;
      console.log(`🐌 [Request #${currentCount}] Slow... (3000ms)`);
      setTimeout(() => {
        console.log(`🐌 [Request #${currentCount}] Finished!`);
        resolve([`Result ${originalQuery} (Slow)`]);
      }, 3000);
    }

    // LOGIC: All subsequent requests are FAST (500ms)
    else {
      console.log(`🚀 [Request #${currentCount}] Fast! (500ms)`);
      setTimeout(() => {
        console.log(`🚀 [Request #${currentCount}] Finished!`);
        resolve([`Result ${query} (Fast)`]);
      }, 500);
    }
  });
};

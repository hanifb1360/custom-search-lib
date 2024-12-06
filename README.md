# **Custom Search Library**

**Custom Search Library** is a versatile JavaScript/TypeScript library for implementing advanced search functionalities. It supports fuzzy search, ranked results, prefix/suffix matching, advanced filtering, sorting, faceted searching and wildcard queries, all with configurable options for diverse use cases.

## **Features**
- **Fuzzy Search**: Finds results based on Levenshtein distance with configurable thresholds.
- **Ranked Fuzzy Search**: Sorts results by relevance using a scoring mechanism.
- **Wildcard Search**: Allows pattern matching using wildcards (`*`).
- **Prefix and Suffix Search**: Matches strings that start or end with the query.
- **Advanced Filtering**: Apply exact, range, or multi-value filters with support for AND/OR logic.
- **Sorting**: Multi-level sorting with locale-aware string comparison.
- **Faceted Search**: Generates facets (categories) with counts for better insights into datasets.
- **Highly Configurable**: Supports case sensitivity, custom thresholds, and multi-field operations.

---

## **Installation**
Install the library via npm:
```bash
npm install custom-search-lib
```

---


## **React TypeScript Example Implementation
1. SearchDemo Component

The main component demonstrates the use of various search functionalities, including filtering, sorting, and faceted search.

```typescript
import { useState } from 'react';
import { 
  fuzzySearch, 
  rankedFuzzySearch, 
  prefixSearch, 
  suffixSearch, 
  wildcardSearch,
  applyFilters,
  sortData,
  generateFacets,
} from 'custom-search-lib'; 
import { SearchResults } from './types/SearchResults'; 
import { mockData } from './mockData/mockData'; 

const SearchDemo = () => {
  const [query, setQuery] = useState(''); 
  const [filters] = useState({ category: 'Books' }); // Example filter
  const [sortConfig] = useState<{ field: string; order: 'asc' | 'desc' }[]>([{ field: 'price', order: 'asc' }]);
  const [results, setResults] = useState<SearchResults>({
    fuzzy: [],
    ranked: [],
    prefix: [],
    suffix: [],
    wildcard: [],
    filtered: [],
    sorted: [],
    facets: {},
  });

  const handleSearch = () => {
    const fuzzyResults = fuzzySearch(query, mockData.map(item => item.name));
    const rankedResults = rankedFuzzySearch(query, mockData.map(item => item.name));
    const prefixResults = prefixSearch(query, mockData.map(item => item.name));
    const suffixResults = suffixSearch(query, mockData.map(item => item.name));
    const wildcardResults = wildcardSearch(query, mockData.map(item => item.name));
    const filteredResults = applyFilters(mockData, filters);
    const sortedResults = sortData(mockData, sortConfig);
    const facets = generateFacets(mockData, ['category']);

    setResults({
      fuzzy: fuzzyResults,
      ranked: rankedResults,
      prefix: prefixResults,
      suffix: suffixResults,
      wildcard: wildcardResults,
      filtered: filteredResults,
      sorted: sortedResults,
      facets: facets,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Demo</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Filtering Example */}
      <div>
        <h3>Filtered Results:</h3>
        <ul>
          {results.filtered.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>

      {/* Sorting Example */}
      <div>
        <h3>Sorted Results:</h3>
        <ul>
          {results.sorted.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>

      {/* Faceted Search Example */}
      <div>
        <h3>Facets:</h3>
        <ul>
          {Object.entries(results.facets.category || {}).map(([key, count]) => (
            <li key={key}>{key}: {count}</li>
          ))}
        </ul>
      </div>

      {/* Other Search Results */}
      <div>
        <h3>Fuzzy Search:</h3>
        <ul>
          {results.fuzzy.map((item, index) => <li key={index}>{item}</li>)}
        </ul>

        <h3>Ranked Fuzzy Search:</h3>
        <ul>
          {results.ranked.map((item, index) => <li key={index}>{item}</li>)}
        </ul>

        <h3>Prefix Search:</h3>
        <ul>
          {results.prefix.map((item, index) => <li key={index}>{item}</li>)}
        </ul>

        <h3>Suffix Search:</h3>
        <ul>
          {results.suffix.map((item, index) => <li key={index}>{item}</li>)}
        </ul>

        <h3>Wildcard Search:</h3>
        <ul>
          {results.wildcard.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default SearchDemo;

```
2. SearchResults Interface

Defines the structure for managing search results.

```typescript
export interface SearchResults {
  fuzzy: string[];
  ranked: string[];
  prefix: string[];
  suffix: string[];
  wildcard: string[];
  filtered: any[]; // Results after applying filters
  sorted: any[]; // Results after sorting
  facets: { [key: string]: { [value: string]: number } }; // Facets
}
```

3. Mock Data

Provides a large dataset for testing the search functionalities.

```typescript
const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateLargeDataset = (size: number): Array<{ name: string; category: string; price: number }> => {
  const categories = ['Books', 'Electronics', 'Clothing', 'Home Appliances', 'Toys', 'Miscellaneous'];
  const dataset: Array<{ name: string; category: string; price: number }> = [];
  for (let i = 0; i < size; i++) {
    dataset.push({
      name: generateRandomString(10),
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 500),
    });
  }
  return dataset;
};

const predefinedDataset = [
  { name: 'Bicycle', category: 'Sports', price: 150 },
  { name: 'Bike', category: 'Sports', price: 200 },
  { name: 'Bicycles', category: 'Sports', price: 180 },
  { name: 'Tricycle', category: 'Sports', price: 120 },
  { name: 'Motorcycle', category: 'Vehicles', price: 1500 },
  { name: 'Hello@World', category: 'Miscellaneous', price: 50 },
  { name: 'Laptop', category: 'Electronics', price: 1000 },
  { name: 'Smartphone', category: 'Electronics', price: 800 },
  { name: 'Headphones', category: 'Electronics', price: 150 },
];

export const mockData = [...predefinedDataset, ...generateLargeDataset(5000)];

```

---

## **Performance**
The library is optimized for performance but can handle large datasets efficiently:
- Uses an optimized Levenshtein algorithm.
- Benchmarked for datasets of up to 100,000 entries.

---

## **License**
This project is licensed under the MIT License.

---
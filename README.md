
# **Custom Search Library**

**Custom Search Library** is a versatile JavaScript/TypeScript library for implementing advanced search functionalities. It supports fuzzy search, ranked results, prefix/suffix matching, and wildcard queries, all with configurable options for diverse use cases.

---

## **Features**
- 🚀 **Fuzzy Search**: Finds results based on Levenshtein distance with configurable thresholds.
- 📊 **Ranked Fuzzy Search**: Sorts results by relevance using a scoring mechanism.
- 🧩 **Wildcard Search**: Allows pattern matching using wildcards (`*`).
- 🔗 **Prefix and Suffix Search**: Matches strings that start or end with the query.
- ⚙️ **Highly Configurable**: Supports case sensitivity and custom thresholds.

---

## **Installation**
Install the library via npm:
```bash
npm install custom-search-lib
```

---

## **Usage**

### **Basic Setup**
To use the library, import the desired functions:
```typescript
import {
  fuzzySearch,
  rankedFuzzySearch,
  prefixSearch,
  suffixSearch,
  wildcardSearch,
} from 'custom-search-lib';
```

---

### **1. Fuzzy Search**
Find results based on Levenshtein distance:
```typescript
const data = ['bicycle', 'bike', 'bicycles', 'tricycle'];
const query = 'bicyc';

const results = fuzzySearch(query, data, { threshold: 2 });
console.log(results); // Output: ['bicycle']
```

---

### **2. Ranked Fuzzy Search**
Sort results by relevance using a scoring system:
```typescript
const results = rankedFuzzySearch(query, data, { threshold: 2 });
console.log(results); // Output: ['bicycle', 'bicycles']
```

---

### **3. Wildcard Search**
Use `*` as a wildcard to match patterns:
```typescript
const data = ['bicycle', 'tricycle', 'motorcycle'];
const query = '*cycle';

const results = wildcardSearch(query, data);
console.log(results); // Output: ['bicycle', 'tricycle', 'motorcycle']
```

---

### **4. Prefix Search**
Find results that start with the query:
```typescript
const results = prefixSearch('bi', data);
console.log(results); // Output: ['bicycle', 'bike']
```

---

### **5. Suffix Search**
Find results that end with the query:
```typescript
const results = suffixSearch('cycle', data);
console.log(results); // Output: ['bicycle', 'tricycle', 'motorcycle']
```

---

## **Configuration Options**

Most functions support configurable options:
- `caseSensitive` (default: `false`): Enables case-sensitive matching.
- `threshold` (default: `2`): Sets the maximum allowable Levenshtein distance for fuzzy searches.

Example:
```typescript
const results = fuzzySearch('Bicycle', data, { caseSensitive: true, threshold: 3 });
console.log(results); // Case-sensitive search
```

---

## **Scoring in Ranked Fuzzy Search**

The scoring algorithm in `rankedFuzzySearch` combines:
1. **Levenshtein Distance**: Penalizes mismatched characters.
2. **Length Difference**: Penalizes results with significant length differences.
3. **Character Overlap**: Rewards matches with more overlapping characters.

---

## **Testing**
Run the test suite to verify functionality:
```bash
npm test
```

---

## **Performance**
The library is optimized for performance but can handle large datasets efficiently:
- Uses an optimized Levenshtein algorithm.
- Benchmarked for datasets of up to 100,000 entries.

---

## **Contributing**
Contributions are welcome! To get started:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m "Add a new feature"`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License.

---

## **Future Enhancements**
- **Regex-based Search**: Advanced pattern matching with regular expressions.
- **Highlight Matches**: Mark matched portions of results.
- **Multilingual Support**: Extend fuzzy search for multilingual datasets.

---


## **Example of Implementation in a React/TypeScript App**

- **Below is a complete example of how to use the custom-search-lib in a React/TypeScript application:**

```typescript
import { useState } from 'react';
import { 
  fuzzySearch, 
  rankedFuzzySearch, 
  prefixSearch, 
  suffixSearch, 
  wildcardSearch 
} from 'custom-search-lib'; // Import the search functions from the package
import { SearchResults } from './types/SearchResults'; // Define types for the results
import { mockData } from './mockData/mockData'; // Simulated dataset for search operations

const SearchDemo = () => {
  const [query, setQuery] = useState(''); // State to store the user input
  const [results, setResults] = useState<SearchResults>({
    fuzzy: [],      // Fuzzy search results
    ranked: [],     // Ranked fuzzy search results
    prefix: [],     // Prefix search results
    suffix: [],     // Suffix search results
    wildcard: [],   // Wildcard search results
  });

  /**
   * Perform search using the query and update results for all search types.
   */
  const handleSearch = () => {
    const fuzzyResults = fuzzySearch(query, mockData); // Fuzzy Search
    const rankedResults = rankedFuzzySearch(query, mockData); // Ranked Fuzzy Search
    const prefixResults = prefixSearch(query, mockData); // Prefix Search
    const suffixResults = suffixSearch(query, mockData); // Suffix Search
    const wildcardResults = wildcardSearch(query, mockData); // Wildcard Search

    // Update results state with results from all search methods
    setResults({
      fuzzy: fuzzyResults,
      ranked: rankedResults,
      prefix: prefixResults,
      suffix: suffixResults,
      wildcard: wildcardResults,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Demo</h1>
      {/* Input field for the query */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      {/* Display results for each search method */}
      <div>
        <h3>Fuzzy Search:</h3>
        <ul>
          {results.fuzzy.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Ranked Fuzzy Search:</h3>
        <ul>
          {results.ranked.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Prefix Search:</h3>
        <ul>
          {results.prefix.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Suffix Search:</h3>
        <ul>
          {results.suffix.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Wildcard Search:</h3>
        <ul>
          {results.wildcard.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchDemo;
```

## **Steps to Integrate the Library in Your Project**
1.	Install the package:

```typescript
npm install custom-search-lib
```


2.	Set up your project:
	**Create a mockData.ts file with sample data:**

```typescript
  // Function to generate random strings
const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  // Function to generate a dataset with random strings
  const generateLargeDataset = (size: number): string[] => {
    const dataset: string[] = [];
    for (let i = 0; i < size; i++) {
      dataset.push(generateRandomString(10)); // Generate 10-character random strings
    }
    return dataset;
  };
  
  // Add some predefined edge cases
  const predefinedDataset = [
    'Bicycle',
    'Bike',
    'Bicycles',
    'Tricycle',
    'Motorcycle',
    'Hello@World',
    'Hello_World',
    'Hello-World',
    '#Hashtag',
    'File.txt',
    'Document.pdf',
    'Image.jpg',
    'Special#Character!',
    'Numbers123',
    'LongStringWithNoSpaces',
    'Short',
    'SuperLongStringWithALotOfCharactersToTestEdgeCases'
  ];
  
  // Combine predefined and generated datasets
  export const mockData = [...predefinedDataset, ...generateLargeDataset(10000)];

  **Define a SearchResults type:**

  export interface SearchResults {
  fuzzy: string[];
  ranked: string[];
  prefix: string[];
  suffix: string[];
  wildcard: string[];
}
```

3.	Run the React app:
	**Add the SearchDemo component to your app and run the development server:**
  
```typescript
  npm start
  ```

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

# Changelog

All notable changes to `custom-search-lib` are documented in this file.

The project follows Semantic Versioning.

## 2.0.0 - 2026-09-10

### Added

* Shared string normalization through `normalizeString`.
* Unicode NFC normalization.
* Optional diacritic removal.
* `rankedFuzzySearchDetailed` with item, score, and Levenshtein distance.
* Generic multi field `fullTextSearch`.
* `and` and `or` operators for full text search.
* Generic type safe `filterData`.
* Inclusive numeric minimum and maximum range filtering.
* Generic immutable `sortData`.
* String sorting support.
* Public `levenshteinDistance` utility.
* Public bounded `levenshteinDistanceWithin` utility.
* ESM package output.
* CommonJS package output.
* TypeScript declaration output.
* Explicit package exports.
* Package consumer tests using the actual npm tarball.
* Automated GitHub Actions CI for Node.js 20, 22, and 24.
* Reproducible benchmarks for datasets containing 1,000, 10,000, and 100,000 entries.
* Property based tests with `fast-check`.
* Expanded normalization, Unicode, edge case, and integration test coverage.

### Changed

* `fuzzySearch` now returns all matches whose Levenshtein distance is within the configured threshold.
* Ranked fuzzy search no longer requires a literal substring match.
* Ranked fuzzy scoring now combines normalized Levenshtein distance, length difference, prefix preference, and substring preference.
* Search functions now use consistent normalization behavior.
* Empty normalized search queries return empty results.
* Full text search now requires explicit typed field selection.
* Full text search token behavior is configurable with `and` or `or`.
* Selected non string full text values are converted to strings before matching.
* Filtering APIs now use generic TypeScript types instead of `any`.
* Sorting now returns a new array instead of mutating the input.
* Sorting supports both numeric and string values.
* `null`, `undefined`, and `NaN` values sort to the end.
* The project source has been reorganized into algorithms, search, data, normalization, and types modules.
* The build target has been modernized to ES2020.
* The package now requires Node.js 20 or newer.
* Development tooling has been modernized to ESLint 10 and the current `typescript-eslint` toolchain.
* Benchmarks now measure the built ESM package instead of relying on unverified performance claims.

### Fixed

* Fuzzy search behavior that previously discarded valid matches inside the configured threshold.
* Ranked fuzzy search behavior that could reject legitimate typo based matches.
* Full text search handling of repeated whitespace and empty tokens.
* Full text search handling of numeric, boolean, null, and missing field values.
* Filtering validation for invalid numeric ranges and `NaN`.
* Sorting behavior for optional, null, and `NaN` values.
* Wildcard search handling of regular expression special characters.
* Inconsistent case, trimming, Unicode, and diacritic behavior between search methods.

### Packaging

* Added `exports` mappings for ESM, CommonJS, and TypeScript.
* Added `sideEffects: false`.
* Added a Node.js engine requirement.
* Added automated prepack builds.
* Added isolated ESM and CommonJS package installation tests.
* Restricted published npm contents to the built package and documentation.
* Added an MIT `LICENSE` file.

### Performance

A benchmark on Node.js `v24.20.0` using an Apple M3 Pro recorded the following median execution times for 100,000 items:

| Operation | Median |
| --- | ---: |
| `fuzzySearch` | 201.085 ms |
| `rankedFuzzySearch` | 230.804 ms |
| `prefixSearch` | 13.497 ms |
| `suffixSearch` | 11.633 ms |
| `wildcardSearch` | 16.152 ms |
| `fullTextSearch` | 47.856 ms |

Benchmark results are environment dependent and should not be interpreted as performance guarantees.

## Previous releases

Historical v1 release notes were not maintained in this changelog.

The v2 migration notes in `README.md` describe the important behavioral differences for existing users.

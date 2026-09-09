import { fullTextSearch } from '../../src/search/fullTextSearch';

describe('Full Text Search', () => {
  it('should return items that match the query', () => {
    const data = [
      { title: 'Red Bicycle', description: 'A bright red bike' },
      { title: 'Blue Bicycle', description: 'A cool blue bike' },
      { title: 'Car', description: 'A fast car' },
    ];
    const query = 'bicycle';

    const results = fullTextSearch(query, data, ['title', 'description']);
    expect(results).toEqual([
      { title: 'Red Bicycle', description: 'A bright red bike' },
      { title: 'Blue Bicycle', description: 'A cool blue bike' },
    ]);
  });

  it('should return an empty array if no items match the query', () => {
    const data = [
      { title: 'Car', description: 'A fast car' },
      { title: 'Bus', description: 'A big yellow bus' },
    ];
    const query = 'bicycle';

    const results = fullTextSearch(query, data, ['title', 'description']);
    expect(results).toEqual([]);
  });
});

describe('Full Text Search - Edge Cases', () => {
    it('should handle an empty dataset gracefully', () => {
      const data: Array<{ [key: string]: string }> = [];
      const query = 'bicycle';
  
      const results = fullTextSearch(query, data, ['title', 'description']);
      expect(results).toEqual([]); // No data, so no matches
    });
  
    it('should handle an empty query gracefully', () => {
        const data = [
          { title: 'Bicycle', description: 'A bright red bike' },
          { title: 'Car', description: 'A fast car' },
        ];
        const query = '';
      
        const results = fullTextSearch(query, data, ['title', 'description']);
        expect(results).toEqual([]); // Empty query should return no matches
      });
  
    it('should handle case-insensitive matching', () => {
      const data = [
        { title: 'BICYCLE', description: 'A bright red bike' },
        { title: 'bicycle', description: 'A blue bike' },
      ];
      const query = 'bicycle';
  
      const results = fullTextSearch(query.toLowerCase(), data, ['title']);
      expect(results).toEqual([
        { title: 'BICYCLE', description: 'A bright red bike' },
        { title: 'bicycle', description: 'A blue bike' },
      ]); // All matching regardless of case
    });
  
    it('should return an empty array if no items match the query', () => {
      const data = [
        { title: 'Car', description: 'A fast car' },
        { title: 'Bus', description: 'A big yellow bus' },
      ];
      const query = 'bicycle';
  
      const results = fullTextSearch(query, data, ['title', 'description']);
      expect(results).toEqual([]); // No matching items
    });
  
    it('should handle very large datasets efficiently', () => {
      const data = Array.from({ length: 10000 }, (_, i) => ({
        title: `item-${i}`,
        description: `description-${i}`,
      }));
      const query = 'item-9999';
  
      const results = fullTextSearch(query, data, ['title']);
      expect(results).toEqual([{ title: 'item-9999', description: 'description-9999' }]);
    });
  });
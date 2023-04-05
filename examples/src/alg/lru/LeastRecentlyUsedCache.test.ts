import LeastRecentlyUsedCache from './LeastRecentlyUsedCache';

describe('LeastRecentlyUsedCache', () => {
  it('should return undefined when getting a non-existent key', () => {
    const cache = new LeastRecentlyUsedCache<string>(2);
    expect(cache.get('non-existent')).toBeUndefined();
  });

  it('should return the value when getting an existing key', () => {
    const cache = new LeastRecentlyUsedCache<string>(2);
    cache.put('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined when getting an expired key', () => {
    const cache = new LeastRecentlyUsedCache<string>(2);
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');
    cache.get('key1');
    cache.put('key3', 'value3');
    expect(cache.get('key2')).toBeUndefined();
  });

  it('should overwrite the value when putting an existing key', () => {
    const cache = new LeastRecentlyUsedCache<string>(2);
    cache.put('key1', 'value1');
    cache.put('key1', 'value2');
    expect(cache.get('key1')).toBe('value2');
  });

  it('should remove the least recently used item when exceeding capacity', () => {
    const cache = new LeastRecentlyUsedCache<string>(2);
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');
    cache.put('key3', 'value3');
    expect(cache.get('key1')).toBeUndefined();
  });
});

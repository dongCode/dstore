class LeastRecentlyUsedCache<T> {
    private cache: { [key: string]: { value: T; prev: string; next: string } } = {};
    private head: string = "";
    private tail: string = "";
    private capacity: number;
  
    constructor(capacity: number) {
      this.capacity = capacity;
    }
  
    get(key: string): T | undefined {
      if (this.cache[key]) {
        const { value, prev, next } = this.cache[key];
        if (prev) {
          this.cache[prev].next = next;
          if (next) {
            this.cache[next].prev = prev;
          } else {
            this.tail = prev;
          }
          this.cache[key].prev = "";
          this.cache[key].next = this.head;
          this.cache[this.head].prev = key;
          this.head = key;
        }
        return value;
      }
    }
  
    put(key: string, value: T): void {
      if (this.cache[key]) {
        this.cache[key].value = value;
        this.get(key);
      } else {
        if (Object.keys(this.cache).length === this.capacity) {
          delete this.cache[this.tail];
          if (this.tail === this.head) {
            this.head = "";
          }
          this.tail = this.cache[this.tail].prev;
          if (this.tail) {
            this.cache[this.tail].next = "";
          }
        }
        this.cache[key] = { value, prev: "", next: this.head };
        if (this.head) {
          this.cache[this.head].prev = key;
        } else {
          this.tail = key;
        }
        this.head = key;
      }
    }
  }
  

  export default LeastRecentlyUsedCache
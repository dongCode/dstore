import LinkedList from "./LinkedList"

describe('LinkedList', () => {
    let linkedList: LinkedList
  
    beforeEach(() => {
      linkedList = new LinkedList()
    })
  
    test('append', () => {
      linkedList.append(1)
      linkedList.append(2)
      linkedList.append(3)
      expect(linkedList.toArray()).toEqual([1, 2, 3])
    })
  
    test('insert', () => {
      linkedList.append(1)
      linkedList.append(3)
      linkedList.insert(1, 2)
      expect(linkedList.toArray()).toEqual([1, 2, 3])
    })
  
    test('delete', () => {
      linkedList.append(1)
      linkedList.append(2)
      linkedList.append(3)
      linkedList.delete(1)
      expect(linkedList.toArray()).toEqual([1, 3])
    })
  
    test('get', () => {
      linkedList.append(1)
      linkedList.append(2)
      linkedList.append(3)
      expect(linkedList.get(1)).toBe(2)
    })
  
    test('set', () => {
      linkedList.append(1)
      linkedList.append(2)
      linkedList.append(3)
      linkedList.set(1, 4)
      expect(linkedList.toArray()).toEqual([1, 4, 3])
    })
  
    test('getSize', () => {
      linkedList.append(1)
      linkedList.append(2)
      linkedList.append(3)
      expect(linkedList.getSize()).toBe(3)
    })
  
    test('isEmpty', () => {
      expect(linkedList.isEmpty()).toBe(true)
      linkedList.append(1)
      expect(linkedList.isEmpty()).toBe(false)
    })
  })
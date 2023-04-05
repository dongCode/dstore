class ListNode {
  val: number
  next: ListNode | null
  constructor(val: number, next: ListNode | null = null) {
    this.val = val
    this.next = next
  }
}

class LinkedList {
  private head: ListNode | null = null   // 链表的头节点
  private size: number = 0   // 链表的长度

  // 在链表尾部添加节点
  append(val: number): void {
    const newNode = new ListNode(val)
    if (this.head === null) {   // 如果链表为空，将新节点设置为头节点
      this.head = newNode
    } else {
      let p: any = this.head
      while (p.next) {   // 找到链表尾部
        p = p.next
      }
      p.next = newNode   // 将新节点添加到链表尾部
    }
    this.size++
  }

  // 在指定位置插入节点
  insert(index: number, val: number): void {
    if (index < 0 || index > this.size) {   // 判断位置是否合法
      throw new Error('Index out of range')
    }
    const newNode = new ListNode(val)
    if (index === 0) {   // 如果插入位置为头部，直接将新节点设置为头节点
      newNode.next = this.head
      this.head = newNode
    } else {
      let p: any = this.head
      for (let i = 0; i < index - 1; i++) {   // 找到插入位置的前一个节点
        p = p.next
      }
      newNode.next = p.next   // 将新节点插入到链表中
      p.next = newNode
    }
    this.size++
  }

  // 删除指定位置的节点
  delete(index: number): void {
    if (index < 0 || index >= this.size) {   // 判断位置是否合法
      throw new Error('Index out of range')
    }
    if (index === 0) {   // 如果删除的是头节点，直接将头节点指向下一个节点
      this.head = this.head!.next
    } else {
      let p: any = this.head
      for (let i = 0; i < index - 1; i++) {   // 找到待删除节点的前一个节点
        p = p.next!
      }
      p.next = p.next!.next   // 将待删除节点从链表中移除
    }
    this.size--
  }

  // 获取指定位置的节点的值
  get(index: number): number {
    if (index < 0 || index >= this.size) {   // 判断位置是否合法
      throw new Error('Index out of range')
    }
    let p: any = this.head
    for (let i = 0; i < index; i++) {   // 找到指定位置的节点
      p = p.next!
    }
    return p.val   // 返回节点的值
  }

  // 修改指定位置的节点的值
  set(index: number, val: number): void {
    if (index < 0 || index >= this.size) { // 判断位置是否合法
      throw new Error('Index out of range')
    }
    let p: any = this.head
    for (let i = 0; i < index; i++) { // 找到指定位置的节点
      p = p!.next!
    }
    p!.val = val // 修改节点的值
  }

  // 返回链表的长度
  getSize(): number {
    return this.size
  }

  // 判断链表是否为空
  isEmpty(): boolean {
    return this.size === 0
  }

  // 将链表转换为数组
  toArray(): number[] {
    const arr: number[] = []
    let p: any = this.head
    while (p) { // 遍历链表并将节点的值添加到数组中
      arr.push(p.val)
      p = p.next
    }
    return arr
  }
}


export default LinkedList

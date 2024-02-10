export const heapSort = (array: number[]) => {
  // 构建最大堆
  buildMaxHeap(array);
  // 交换堆顶元素到数组末尾，并调整堆
  for (let i = array.length - 1; i > 0; i--) {
    swap(array, 0, i);
    maxHeapify(array, 0, i);
  }
  return array;
};

export const buildMaxHeap = (array: number[]) => {
  // 从最后一个非叶子节点开始，依次进行最大堆调整
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    maxHeapify(array, i, array.length);
  }
};

export const maxHeapify = (array: number[], i: number, heapSize: number) => {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  // 找到左右子节点中最大的节点
  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }
  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  // 如果最大节点不是当前节点，则交换节点并递归调整堆
  if (largest !== i) {
    swap(array, i, largest);
    maxHeapify(array, largest, heapSize);
  }
};

export const swap = (array: number[], i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export default heapSort;

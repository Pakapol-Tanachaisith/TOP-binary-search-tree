import Node from "./Node";

function cleanArray(arr = []) {
  let cleanedArr = arr.sort((a, b) => a - b);
  return [...new Set(cleanedArr)];
}

function buildTree(arr = [], start, end) {
  if (start > end) return null;

  const mid = parseInt((start + end) / 2);

  if (!arr[mid]) return null;
  const node = new Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);

  return node;
}

class Tree {
  #NODE_TYPE = {
    LEAF: "LEAF",
    SINGLE_CHILD: "SINGLE_CHILD",
    TWO_CHILDREN: "TWO_CHILDREN",
  };

  constructor(arr = []) {
    const root = buildTree(cleanArray(arr), 0, arr.length - 1);
    this.root = root;
  }

  #checkNodeType(node) {
    if (!node) return null;

    const left = node?.left;
    const right = node?.right;

    if (!left && !right) return this.#NODE_TYPE.LEAF;

    if (left && right) return this.#NODE_TYPE.TWO_CHILDREN;

    return this.#NODE_TYPE.SINGLE_CHILD;
  }

  // Insertion
  insert(value, root = this.root) {
    if (!root) return;

    const { left, right, data } = root;

    if (value <= data && !left) {
      root.left = new Node(value);
      return;
    }

    if (value > data && !right) {
      root.right = new Node(value);
      return;
    }

    const nextInitialRoot = value <= data ? left : right;
    this.insert(value, nextInitialRoot);
  }

  // Deletion
  #deleteRootNode() {
    const targetNode = this.root;

    let successorParent = targetNode;
    let successor = targetNode.right;

    while (successor?.left) {
      successorParent = successor;
      successor = successor.left;
    }

    if (successorParent?.data !== targetNode?.data) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }

    this.root.data = successor.data;
  }

  delete(value, root = this.root) {
    if (!root) return;

    if (value === root.data) {
      this.#deleteRootNode();
      return;
    }

    // Reach parent of the target node
    if (root?.right?.data === value || root?.left?.data === value) {
      const direction = value === root?.left?.data ? "left" : "right";
      const targetNodeType = this.#checkNodeType(root[direction]);

      switch (targetNodeType) {
        case this.#NODE_TYPE.LEAF:
          root[direction] = null;
          return;
        case this.#NODE_TYPE.SINGLE_CHILD:
          const targetChild = root[direction]?.left ?? root[direction]?.right;
          root[direction] = targetChild;
          return;
        case this.#NODE_TYPE.TWO_CHILDREN:
          const targetNode = root[direction];

          let successorParent = targetNode;
          let successor = targetNode.right;

          while (successor?.left) {
            successorParent = successor;
            successor = successor.left;
          }

          if (successorParent?.data !== targetNode?.data) {
            successorParent.left = successor.right;
          } else {
            successorParent.right = successor.right;
          }

          root[direction].data = successor.data;
          return;
      }
    }

    const nextRoot = value < root.data ? root?.left : root?.right;
    this.delete(value, nextRoot);
  }

  find(value, root = this.root) {
    if (!root) return null;

    if (value === root.data) return root;

    const nextRoot = value < root.data ? root.left : root.right;
    return this.find(value, nextRoot);
  }
}

export default Tree;

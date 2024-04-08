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

  levelOrder(callBack = (node) => {}, root = this.root) {
    if (!root) return;

    const queue = [this.root];
    const nodes = [];

    while (queue.length) {
      const currentNode = queue[0];

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);

      nodes.push(currentNode.data);
      queue.shift();
    }

    nodes.forEach(callBack);
  }

  preOrder(callback = (node) => {}, root = this.root) {
    if (!root) return;

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  inOrder(callback = (node) => {}, root = this.root) {
    if (!root) return;

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  postOrder(callback = (node) => {}, root = this.root) {
    if (!root) return;

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  #getLeaf(root = this.root) {
    const leafs = [];

    this.inOrder((item) => {
      const nodeType = this.#checkNodeType(item);
      if (nodeType === this.#NODE_TYPE.LEAF) {
        leafs.push(item);
      }
    }, root);

    return leafs;
  }

  depth(node, root = this.root) {
    if (!node) return -1;

    let result = 0;
    let currentNode = root;

    while (currentNode) {
      if (currentNode === node) return result;

      result++;

      const nextNode =
        node.data < currentNode.data ? currentNode.left : currentNode.right;
      currentNode = nextNode;
    }

    return result;
  }

  height(node) {
    if (!node) return -1;

    const leafs = this.#getLeaf(node);
    const deepestLeafDepth = leafs.reduce((acc, leaf) => {
      const leafDepth = this.depth(leaf);
      return leafDepth > acc ? leafDepth : acc;
    }, 0);

    const targetNodeDepth = this.depth(node);

    return deepestLeafDepth - targetNodeDepth;
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);

    console.log({ leftHeight, rightHeight });

    if (leftHeight === rightHeight) return true;
    if (leftHeight === rightHeight + 1) return true;
    if (leftHeight === rightHeight - 1) return true;

    return false;
  }
}

export default Tree;

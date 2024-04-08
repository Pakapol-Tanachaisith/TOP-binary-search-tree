import Tree from "./Tree";
import { prettyPrint, ranNum } from "./utils";

const example = [];

for (let i = 1; i <= 25; i++) {
  example.push(ranNum());
}

const bst = new Tree(example);
prettyPrint(bst.root);

console.log("Is Balanced: ", bst.isBalanced());
bst.insert(120);
bst.insert(150);
bst.insert(160);
bst.insert(170);
bst.insert(180);
prettyPrint(bst.root);
console.log("Is Balanced: ", bst.isBalanced());

bst.rebalance();
prettyPrint(bst.root);
console.log("Is Balanced: ", bst.isBalanced());

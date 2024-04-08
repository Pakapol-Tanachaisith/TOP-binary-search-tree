import Tree from "./Tree";
import { prettyPrint } from "./utils";

const EXAMPLE = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(EXAMPLE);
prettyPrint(bst.root);
// console.log(bst.depth(bst.root.right.left.left));

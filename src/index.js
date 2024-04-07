import Tree from "./Tree";
import { prettyPrint } from "./utils";

const EXAMPLE = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(EXAMPLE);

// bst.insert(150);
// bst.insert(6);
prettyPrint(bst.root);

// bst.delete(6);
// prettyPrint(bst.root);

// console.log(bst.find(324));

// bst.levelOrder((node) => {
//   console.log(node);
// });

import MemDown from "memdown";
import { BaseTrie as Trie } from "merkle-patricia-tree";

// const db = level("./testdb");
const db = MemDown();
const trie = new Trie(db);

async function test() {
  await trie.put(Buffer.from("test"), Buffer.from("one"), function (err) {
    if (err) return console.log("put error", err);
    console.log("put success");
  });
  await trie.put(Buffer.from("test"), Buffer.from("one"), function (err) {
    if (err) return console.log("put error", err);
    console.log("put success");
  });
  await trie.put(Buffer.from("test2"), Buffer.from("two"), function (err) {
    if (err) return console.log("put error", err);
    console.log("put success");
  });
  const value1 = await trie.get(Buffer.from("test"));
  console.log(value1.toString()); // one
  // this will proove that test3 is not a hash in tree
  const proof = await Trie.createProof(trie, Buffer.from("test3"));
  const value = await Trie.verifyProof(trie.root, Buffer.from("test3"), proof);
  console.log(value.toString()); //
}

test();

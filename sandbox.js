const iterator = generateNumber();

function* generateNumber() {
let i = 0;
  while (true) {
    yield i++;
  }

}

console.log('res1 = ', iterator.next());
console.log('res2 = ', iterator.next());
console.log('res3 = ', iterator.next());

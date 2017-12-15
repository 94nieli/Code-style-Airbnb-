12.2 - 当通过变量去访问属性的时候 使用中括号[]
const luck = {
  jedi: true,
  age: 28,
};
function getProp(prop) {
  return luck[prop];
}
const isJedi = getProp('jedi');

12.3 - 当取幂的时候 使用**
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;


13.1 - 总是使用let和const去声明变量 不这样做的话会导致全局变量 污染全局的命名空间
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower;


13.2 - 对应声明一个变量就用一个let或者const
// bad
const items = getItems(),
	goSportsTeam = true,
	dragonball = 'z';

// bad
const items = getItems(),
	goSportsTeam = true;
	dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';


13.3 - const放一块 let放一块
let i, len, dragonball,
	items = getItems(),
	goSportsTeam = true;

// bad
let i;
const items = getItems()l
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;


13.4 - 变量在哪需要就在哪注册 但是把他们放在合理的位置
// bad
function checkName(hasName) {
  const name = getName();

  if(hasName === 'test') {
  	return false;
  }

  if(name === 'test') {
  	this.setName('');
  	return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
  	return false;
  }

  const name = getName();

  if(name === 'test') {
  	this.setName('');
  	return false;
  }

  return name;
}

13.5 - 不要链式分配变量
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // a就是变成let赋值 但是B C就变成了全局变量
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
 let a = 1;
 let b = a;
 let c = a;
console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError
}());

13.6 - 避免使用 ++ --
// bad
const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
  	truthyCount++;
  }
}

// good
const array = [1, 2, 3];
let num++;
num += 1;
num -= 1;

const sum = array.redece((a, b) => a + b, 0);
const truthyCount = array.filter(boolean).length;
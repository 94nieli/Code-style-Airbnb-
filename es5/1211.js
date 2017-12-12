git 地址 https://github.com/airbnb/javascript/tree/es5-deprecated/es5

1.1 - 简单类型 string number boolean null undefined 变量间要隔 分号紧跟上 

var foo = 1;
var bar = foo;

bar = 9;

console.log(foo[0], bar[0]);

1.2 - 复杂类型 obejct array function

var foo = [1, 2];
var bar = foo;
bar[0] = 9;
console.log(foo[0], bar[0]);

2.1 - const const can't reassign avoid bugs
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;

2.2 - let block-scroped rather than function-scoped 块级作用域

// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let
let count = 1;
if (true) {
  count += 1;
}

// let and const are block-scoped  only exist in the blcok they are defined in
{
  let a = 1;
  const b = 1;
}
console.log(a); // RefferenceError
console.log(b); // RefferenceError

3.1 - Object
// bad
const item = new Object();

// good
const item = {};

3.2 -当对象的时候  你可以这么做
function getKey(k) {
  return `a key named ${k}`;
}

// bad
cosnt obj = {
  id: 5,
  name: 'san Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj {
  id: 5,
  name: 'san Francisco',
  [getKey('enabled')]:true,
}

3.3 -方法定义时的简写
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
	value: 1,

	addValue(value) {
	  return atom.value + value;
	},
};

3.4 - 定义属性的简化
 const luckSkywalker = 'Luke Skywalker';

 // bad
const obj = {
	luckSkywalker: luckSkywalker,
};

// good
const obj = {
	luckSkywalker,
}

3.5 - 把可简化的属性组合在对象内的前方 简洁明了
const anakinSkywalker = 'anakin Skywalker';
const luckSkywalker = 'luck Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};

3.6 - 只引用无效的标示符
// bad
const bad = {
  'foo': 3，
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};

3.7 当使用对象身上的原型方法时 不要直接使用 因为可能被属性掩盖
// bad
console.log(object.hasOwnProperty);

// good
console.log(Object.prototype.hasOwnProperty.call(obejct, key));

// best
const has = Object.prototype.hasOwnProperty;

// or
import has from 'has';

console.log(has.call(obejct, key));

3.8 - 用解构别用assign
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original,{ c: 3 });
delete copy.a;

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original , { c: 3 });

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 };
const { a, ...noA } = copy;

4.1 - 直接定义不要用new
// bad
const items = new Array();

// good
const item = [];

4.2 - 用push而不是直接定义
const somestack = [];

// bad
someStack[someStack.length] = 'abracadbra';

// good
someStack.push('abracadara');

4.3 - 用解构来拷贝数组

// bad
const len = items.length;
const itemsCopy = [];
let i;

for(i = 0; i < len; i+=1){
	itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];

4.4 -将类数组转化为数组 用解构而不是Array.from
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best 
const nodes = [...foo];

4.5 map一个数组的时候使用Array.from 而不是 ... 因为这样可以避免创建一个中间数组
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);

4.6 - 使用return陈述句作为一个数组方法的回调
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2 , 3].map(x => x + 1);

// bad 没有返回值意味着memo在初次迭代后变成了undefined
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) =>{
  const flatten = memo.concat(item);
  memo[index] = flatten;
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) =>{
  const flatten = memo.concat(item);
  memo[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
  	return author === 'Harper Lee';
  } else {
  	return false;
  }
});

// good
inbox.filter((msg) => {
	const { subject, author } = msg;
	if (subject === 'Mockingbird') {
	  return author === 'Harper Lee';
	}

	return false;
})

4.7 - 如果一个数组有多行 在括号的开闭合前 应该换行

// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];


// good

const arr = [[0, 1], [2, 3], [4, 5]];

const obejctInArray = [
  {
    id: 1,
  },
  {
  	id: 2,
  },
];

const numberInArray = [
  1,
  2,
]
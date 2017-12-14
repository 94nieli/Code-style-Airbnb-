6-1 字符串应该用单引号
// bad
const name = "Capt. Janeway";

// bad
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';

6-2 字符串超过100字的最好写一行（es5版本建议写多行）看个人吧
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

6-3 当需要编程式的创建字符串的时候 使用模板字符串而不是连接符 这样更可读 简介 而且易插入
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?` //注意区别
}

6-4 永远不要在字符串中使用 eval() 虽然很强大 但是有太多缺点

6-5 反斜杠对可读性有影响 只在他们需要的时候使用
// bad
const foo = '\'this\' \i\s \"quoted"';

// good
const foo = '\'this\' is "quoted"'; //'this' is "quoted"
const foo = `my name is '${name}'`;

7.1 - 函数声明式和函数表达式
// bad
function foo() {
  //...
};

// bad
const foo = function () {
  //...
};

// good
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  //...
}

7.2 - 将自执行函数用括号包起来
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());

7.3 - 不要将函数定义在 if while等里面 虽然浏览器会允许这么做 但是会解析的不同

7.4 - 我也不知道怎么翻译 自己看吧
// bad
if (curretUser) {
  function test() {
  	console.log('Nope. ');
  }
}

// good
let test;
if (curretUser) {
  test = () => {
  	console.log('Yup.');
  };
}

7.5 - 不要给参数命名为arguments 这将覆盖arguments对象
// bad
function foo (name, options, arguments) {
  // ...
};

// good
function foo (name, options, args) {
  //...
}

7.6 - 获取参数用拓展运算符而不是arguments 因为arguments只是类数组 拓展运算符是真数组
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good       enate 母系的
function concatenate(...args) {
  return args.join('');
}

7.7 - 使用默认参数语法而不是改变函数的参数
// very bad
function handleThings(opts) {
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
  	opts = {};
  }
  //...
}

// good
function handleThings(opts = {}) {
  //...
}

7.8 - 避免默认参数的副作用
var b = 1;
//bad
function count(a = b++) {
  console.log(a);
}
count();  //1
count();  //2
count(3); //3
count();  //3

7.9 - 总是将默认参数放在最后面
// bad
function handleThings(opts = {}, name) {
  //...
}

// good
function handleThing(name, opts = {}) {
 //...
}

7.10 - 不要使用函数构造器来构造函数
// bad
var add = new Function('a', 'b', 'return a + b');
var subtract = new Function('a', 'b', 'return a + b');

7.11 - 看好了 优雅的函数定义方式
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};

7.12 - 不要直接操作形参
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}

7.13 - 不要重新再分配参数
// bad
function f1(a) {
  a = 1;
}

function f2(a) {
  if(!a) { a = 1;}
}

// good
function f3(a) {
  const b = a || 1;
}

function f4(a = 1) {

}

7.14 - 省略运算符用能实现call的功能也是66的
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5]
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);

7.15 - 最后的参数记得也要加逗号 每个参数占一行
// bad
function foo(bar,
			 baz,
			 quux) {

}

// good
function foo(
  bar,
  baz,
  quux,
) {
  //...
}

// bad
console.log(foo,
  bar,
  baz);

// good
console.log(
  foo,
  bar,
  baz,
 );


8.1 - 当你必须使用匿名函数的时候 请使用箭头函数
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
})

8.2 - 
// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
})

// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${number}.`;
})

// good
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

//
function foo(callback) {
  const val = callback();
  if(val === true) {
  	// Do st if callback return ture
  }
}

let bool = false;

// bad
foo(() =>  bool = true);

// good
foo(() =>{
	bool = true;
});

8.3 - 万一表达式跨越多行 为了更好的可读性 请用括号包起来
// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));

8.4 - 写在一行的时候 都不用加括号 只返回一个值的时候 不用加括号 但是这个值换行写了就加个小括号
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

8.5 - 避免混淆箭头函数和比较符号  >= <= (=>)
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
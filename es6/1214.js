9.1 - 避免直接操作原型 最好用class
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
  	this.queue = [...contents];
  }
  pop() {
  	const value = this.queue[0];
  	this.queue.splice(0, 1);
  	return value;
  }
}

9.2 - 继承使用extends
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  return this.queue[0];
}
inherits(PeekableQueue,Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
  	return this.queue[0];
  }
}

9.3 - 方法可以返回this 跟JQ的链式反应一样
// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
}

const luck = new Jedi();
luck.jump(); //true
luck.setHeight(20); //undefined

// good
class Jedi {
  jump() {
  	this.jumping = true;
  	return this;
  }

  setHeight(height) {
  	this.height = height;
  	return this;
  }
}

const luck = new Jedi();

luck.jump()
  .setHeight(20);

9.4 - 写个传统的tostring方法也是没有问题的 只要确保没有副作用就行了
class Jedi {
  constructor(options = []) {
  	this.name = options.name || 'no name';
  }

  getName() {
  	return this.name;
  }

  toString() {
  	return `Jedi - ${this.getName()}`;
  }
}

9.5 - 类在没有指明的时候会有一个默认的构造器
// bad
class Jedi {
  constructor() {}

  getName() {
  	return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
  	super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
  	super(...args);
  	this.name = 'Rey';
  }
}

9.6 - 避免复制类的成员 因为类成员这样声明只会取最新的一个 况且多次声明本身就算是bug
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// good
class Foo {
  bar() { return 1; }
}

// good
class Foo {
  bar() { return 2; }
}


10.1 - 多用用module ( import / export ) 那就是future
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;


10.2 - 不要使用通配符
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';


10.3 - 不要直接从一个import里面直接export出去 他会伤心的
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;


10.4 - 不要多次从一个路径import 这样会使代码更难维护
// bad
import foo from 'foo';
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo,{
  named1,
  named2,
} from 'foo';


10.5 - 不要export一个可变的绑定
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };

10.6 - 在一个模块中如果只有一个export 那么用default更好
// bad
export function foo() {};

// good
export default function foo() {};

10.7 - 把所有的import放在上方
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();

10.8 - 多行引用应该用逗号隔开  就跟数组还有对象一样
// bad
import {longNameA, longNameB, longNameC, longNameD} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
} from 'path';

10.9 - 不允许在模块引用中使用webpack loader语法
// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';

// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';


11.1 - 不要用iterator 
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum ===15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// bad
const increasedByOne = [];
const sum = numbers.reduce((total, num) => total + num, 0);
sum ===15;

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best
const increasedByOne = numbers.map(num => num + 1);

11.2 - 现在暂时别用generators

11.3 - 如果你一定要使用generator 忽视我们的建议的话 勿谓言之不预也
// bad
function * foo() {
  // ...
}

// bad
const bar = function * () {
  // ...
};

// bad
const baz = function *() {
  // ...
};

// bad
const quux = function*() {
  // ...
};

// bad
function*foo() {
  // ...
}

// bad
function *foo() {
  // ...
}

// very bad
function
*
foo() {
  // ...
}

// very bad
const wat = function
*
() {
  // ...
};

// good
function* foo() {
  // ...
}

// good
const foo = function* () {
  // ...
};


12.1 - 访问属性的时候用圆点符号
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
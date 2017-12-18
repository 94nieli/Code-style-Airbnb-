14.1 - var 会被预解析 被提升至局部的最顶端 但是const let 不会 他们会开辟一个temporal Dead Zones
// we know this wouldn’t work (assuming there
// is no notDefined global variable)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// creating a variable declaration after you
// reference the variable will work due to
// variable hoisting. Note: the assignment
// value of `true` is not hoisted.
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// the interpreter is hoisting the variable
// declaration to the top of the scope,
// which means our example could be rewritten as:
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// using const and let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}

14.2 - 匿名函数表达式会提升他的变量名称  但不会提升函数的注册
function example() {
  console.log(anonymous); //undefined

  anonymous();

  var anonymous = function () {
  	console.log('anonymous function expression');
  };
}

14.3 - 有名函数表达式会提升它的变量 但是不是函数名称或者函数本体
function example() {
  console.log(named);// undefined

  named();

  superPower();

  var named = function superPower() {
  	console.log('Flying');
  };
}


function example () {
  console.log('named');

  named();

  var named = function named() {
  	console.log('named');
  };
}


14.4 - 函数声明式会提升他们的名称还有函数体
function example(){
  superPower(); // Flying

  function superPower() {
  	console.log('Flying');
  }
}


15.1 - 比较运算符
  多用=== 和 !==


15.2 - 条件语句比如if会在比较的时候强制转换类型成布尔值 并且会遵循以下规则
	obejct => true
	undefined => false
	Null => false
	布尔运算转化为对应的布尔值
	数值的话 +0 -0 或者NaN会转为false 其他的转为true
	字符串的话除了''转为false 其他的都转为true

	if([0] && []){
		// true
		//即便为空集合 也是转为true
	}


15.3 - 使用简写的布尔表达式 但是对字符串和数值类型的表达式要明确
详细网址
// bad
if ( isValid === true) {

}

// good
if ( isValid ) {

}

// bad
if (name) {

}

// good
if (name !== '') {

}

// bad
if (collection.length) {

}

// good
if (collection.length > 0) {

}


15.4 - https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108


15.5 - 在case语句和default的时候用花括号把条件括上 
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
  	class C {};
}

// good
switch (foo) {
  case 1: {
  	let x = 1;
  	break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}

15.6 - 三元计算符应该写成一行  不能嵌套
// bad
const foo = maybe1 > mayeb2
  ? "bar"
  : value1 > value2 ? "baz" : null;

把它拆分成两个三目表达式

const maybeNull = value1 > value2 ? 'baz' : null;

// better
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;


15.7 - 避免不必要的三目表达式
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;


15.8 - 当一条语句中混用了操作符 记得括上括号
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad
if(a || b && c) {
  return d;
}

// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

// good
const bar = (a ** b) - (5 % d);

// good
if (a || (b && c)) {
  return b;
}

// good
const bar = a + b / c * d;


16.1 - 一个块级作用域包含多行的时候请使用{}
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar() {
  return false;
}

16.2 - 在使用if和else的时候  else与 } 占一行
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}

16.3 - 在if判断语句中总要返回return 那么后面的else就没有必要加上了 在if和else if里面都有return的话 可以拆分为多行if
// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

//good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}


17.1 - 如果你的判断条件太长 那就换行写 逻辑运算符应该放在首位

// bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1();
}

// bad
if (foo === 123 &&
  bar === 'abc') {
  thing1();
}

// bad
if (foo === 123
  && bar === 'abc') {
  thing1();
}

// bad
if (
  foo === 123 &&
  bar === 'abc'
) {
  thing1();
}

// good
if (
  foo === 123
  && bar === 'abc'
) {
  thing1();
}

// good
if (
  (foo === 123 || bar === "abc")
  && doesItLookGoodWhenItBecomesThatLong()
  && isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 && bar === 'abc') {
  thing1();
}


18.1 - 多行注释用/**....*/
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

18.2 - 单行注释使用//
单行注释另起一行 除非是块中的第一行 不然要跟上面空一行
// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}


18.3 - 应该在备注前加一个空格  可读性更高
// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

18.4 - 用FIXME来指出需要修复的代码 用TODO来说明需要实施的地方

18.5 - 使用//FIXME来注释问题

class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: shouldn’t use a global here
    total = 0;
  }
}


18.6 - 使用//TODO来注释解决问题的方法
class Calculator extends Abacus {
  constructor() {
    super();

    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}



19.1 - 换行空两个
// bad
function foo() {
∙∙∙∙let name;
}

// bad
function bar() {
∙let name;
}

// good
function baz() {
∙∙let name;
}


19.2 - 花括号之前 空一格
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});


19.3 - 在控制语句之前应该空一格 在函数名称和参数列表中不要空格
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}


19.4 - 运算符两边都应该用空格分开
// bad
const x=y+5;

// good
const x = y + 5;

19.5 - 一个文件结束末尾应该用一个换行符号
// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;

// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
↵


// good
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵


19.6 - 当使用很长的链式反应的时候 在每个方法之前用.
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led').data(data);


19.7 - 块与块之间留一个空行
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;

19.8 - 不要有没必要的空行
// bad
function bar() {

  console.log(foo);

}

// bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// bad
class Foo {

  constructor(bar) {
    this.bar = bar;
  }
}

// good
function bar() {
  console.log(foo);
}

// good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}

19.9 - 不要在括号内部添加多余的括号
// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log(foo);
}

// good
if (foo) {
  console.log(foo);
}

19.12 - 避免一行超过100个字符 包括空格 当然 字符串不在此列
/ bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy;

// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));


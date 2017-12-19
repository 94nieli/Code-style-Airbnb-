20.1 - 不要把逗号放在每行的开头
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};

20.2 - 额外的尾随的逗号可以加  为了方便git进行diff 你也不用担心他会产生在浏览器的遗留问题
因为babel会自动移除掉
// bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};

// good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};


// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

const heroes = [
  'Batman',
  'Superman'
];

// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];

// bad
function createHero(
  firstName,
  lastName,
  inventorOf
) {
  // does nothing
}

// good
function createHero(
  firstName,
  lastName,
  inventorOf,
) {
  // does nothing
}

// good (note that a comma must not appear after a "rest" element)
function createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
) {
  // does nothing
}

// bad
createHero(
  firstName,
  lastName,
  inventorOf
);

// good
createHero(
  firstName,
  lastName,
  inventorOf,
);

// good (note that a comma must not appear after a "rest" element) 扩展运算符后面不要加逗号
createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
);


21.1 - 
// bad
const luke = {}
const leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')

// bad
const reaction = "No! That's impossible!"
(async function meanwhileOnTheFalcon(){
  // ...
}())

// bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
function foo() {
  return
    'search your feelings, you know it to be foo'
}

// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});

// good
const reaction = "No! That's impossible!";
(async function meanwhileOnTheFalcon(){
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}());

// good
function foo() {
  return 'search your feelings, you know it to be foo';
}


22.1 - 在一开始的时候就执行强制类型转换

22.2 - Strings

// this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore);//typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);


22.3 - Numbers
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue > 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue,10);

22.4 - parseInt是制约你的瓶颈 这个时候需要用位移操作符来获得更好的性能 请注释上你的理由
// good
/**
 * parseInt was the reason my code was slow.
 * Bitshifting the String to coerce it to a
 * Number made it a lot faster.
 */
const val = inputValue >> 0;

22.5 - 注意当使用位移操作符的时候，数字会转化为64位的，但是位移操作符只会返回一个32位的整数类型
所以对于32位以上的整数 位移操作符会导致不可预期的问题

最大的32位正整数为2,147,483,647

2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647


22.6 - 布尔值

const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !! age


23.1 - 避免用单个字母去命名 命名要用描述性文字
// bad
function q() {
  //...
}

// good
function query() {
  //...
}

23.2 - 在命名对象 方法 和实例的时候 使用小驼峰式
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}


23.3 - 在命名构造器和类的时候也要使用大驼峰式
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});

23.4 - 不要把下划线放在头部和尾部
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// good
this.firstName = 'Panda';

23.5 - 不要给this添加引用 用箭头函数
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}


23.6 - 文件在import的时候  要和export的名称匹配
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// in some other file
// bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

// bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js


23.7 - 在export-default一个function 应该使用小驼峰
function makeStyleGuide() {
  // ...
}

export default makeStyleGuide;

23.8 - 在输出一个 constructor / class / singleton / function library / bare object的时候 你应该用大驼峰
const AirbnbStyleGuide = {
  es6: {
  },
};

23.9 - 缩略词都应该大写 或者全部小写
// bad
import SmsContainer from './containers/SmsContainer';

// bad
const HttpRequests = [
  // ...
];

// good
import SMSContainer from './containers/SMSContainer';

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from './containers/TextMessageContainer';

// best
const requests = [
  // ...
];



24.1 - 属性的访问器并未被要求

24.2 - 不要使用JS的getter/setter 因为他们会造成不可以预知的副作用 并且更加以检测和
维护  如果你一定要使用的话 使用 getVal() 和 setVal('hello')

// bad
class Dragon {
  get age() {
    // ...
  }

  set age(value) {
    // ...
  }
}

// good
class Dragon {
  getAge() {
    // ...
  }

  setAge(value) {
    // ...
  }
}


24.3 如果属性或者方法时一个布尔值的话  使用 IsVal() 或者 hasVal()
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}


24.4 - 创造get和set方法也没问题  但是要确保一致
class jedi {
  constructor(options = {}) {
  	const lightsaber = options.lightsaber || 'blue';
  	this.set('lightsaber', lightsaber);
  }

  set(key, val) {
  	this[key] = val;
  }

  get(key) {
  	return this[key];
  }
}


25.1 - 当将数据和事件绑定的时候 传值传个集合方便后期为事件添加更多的数据
// bad
$(this).trigger('listingUpdated', listing.id);

// ...

$(this).on('listingUpdated', (e, listingId) => {
  // do something with listingId
});


// good
$(this).trigger('listingUpdated', { listingId: listing.id });

// ...

$(this).on('listingUpdated', (e, data) => {
  // do something with data.listingId
});


26.1 - 在使用JQ的时候 筛选出来的集合加上前缀方便识别
// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');

// good
const $sidebarBtn = $('.sidebar-btn')


26.2 - 缓存JQ查找的集合
// bad
function setSidebar() {
  $('.sidebar').hide();

  // ...

  $('.sidebar').css({
    'background-color': 'pink',
  });
}

// good
function setSidebar() {
  const $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...

  $sidebar.css({
    'background-color': 'pink',
  });
}


26.3 - DOM查询使用级联 $('.sidebar ul') 或者 $('.sidebar > ul')

26.4 - 使用find来查找JQ指定的元素集合

// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();


27.1 - es5的兼容性
http://kangax.github.io/compat-table/es5/


28.1 - 无关的~

29.1 - 使用 Number.NaN而不是全局的NaN 因为全局的NaN会把强制转化非数值类型
强制转换为NaN的也会返回true

// bad
isNaN('1.2'); // false
isNaN('1.2.3');  // true

// good
Number.isNaN('1.2.3'); // false
Number.isNaN(Number('1.2.3'));  //true


29.2 - 使用 Number.isFinite而不是全局的isFinite
同理 他也会强制转换非数字类型 强制转换为finite的也会返回true

// bad
isFinite('2e3'); // true

// good
Number.isFinite('2e3');  // false
Number.isFinite(parseInt('2e3', 10))  // true
// 原始数据类型
let isBoolen: boolean = true;
let number: number = 123;
let bigInt: bigint = 123n;
let string: string = 'string';
let nullValue: null = null;
let undefinedValue: undefined = undefined;
let symbolValue: symbol = Symbol('symbol');

// 新增类型
let anyValue: any = 'any';
let unknownValue: unknown = 'unknown';
let unionValue: string | number = 'union';   //联合类型
let crossValue:{name:string}={name:'cross'} //交叉类型
let enumValue: { name: string; age: number } = { name: 'enum', age: 123 };
let functionValue: () => void = () => {};

// 接口 
interface Person {
    name: string;
    age: number;
}
// 定义一个实现PPerson的变量  属性必须和接口定义的属性一致，不能多也不能少
let tom: Person = {
    name: 'tom',
    age: 123
}
// 接口的可选属性
interface Person1 {
    name: string;
    age?: number;
}
let tom1: Person1 = {
    name: 'tom'  //只定义name属性，age属性可以不定义
}



// 任意属性
interface Person2 {
    name: string;
    age?: number;
    [attr: string]: any;
}
let tom2: Person2 = {
    name: 'tom',
    age: 123,
    demo: 123
}

// 只读属性
interface Person3 {
    readonly id: number;
    name: string;
}
let tom3: Person3 = {
    id: 123,
    name: 'tom'
}
// 只读属性不能修改 会报错
// tom.id = 9527;

// 可索引签名
interface Person5{
    name:string;
    [nonX:string]:any;
    // [nony:symbol]:any;通常写字符串索引签名，因为js对象的键只能是字符串
}
let tom5:Person5 = {
    name:'tom',
    age:123, 
    demo:'demo'

}


//  用来限制数组中的元素类型
let firArray:number[] = [1,2,3];

// 数组泛型表示数组中所有元素都是同一类型
let secArray:Array<number> = [1,2,3];

// 通常使用any数组来表示复杂类型
let anyArray:any[] = [1,2,3,'demo',true];

// 函数类型 参数类型和返回值类型，不能多也不能少
let func = (a:number,b:number):number=>{
    return a + b;
}

// 函数的可选参数，可选参数必须放在必选参数的后面
let func1 = (a:number,b?:number):number=>{
    // 如果b没有传，则返回a
    return a;
}
// 函数的默认参数
let func2 = (a:number,b:number=123):number=>{
    // b的值为123，如果传了值，则使用传的值
    return a + b;
}

// 函数的剩余参数，a和b是必选参数，c是剩余参数，c是一个数组，数组中的元素是剩余参数，
let func3 = (a:number,b:number,...c:number[]):number=>{
    // c是一个数组，数组中的元素是剩余参数
    return a + b + c.reduce((pre,cur)=>pre+cur,0);
}
func3(1,2,3,4,5,6,7,8,9,10);   // a和b的值为1和2，c的值为3,4,5,6,7,8,9,10 输出的值为55

type TypeScriptFun = {name:string,age:number};
// 函数解构 只传入一个参数，参数是一个对象，对象中有name和age属性
function fun1({name,age}:TypeScriptFun){
    console.log(name,age);
    return name + age;
}
fun1({name:'tom',age:123}); // 输出tom 123

// 类型断言  不要使用 as any ，因为这样会失去类型检查
interface Cat {
    nameA: string;
    run(): void;
}
interface Fish {
    nameA: string;
    swim(): void;
}
// 使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，否则可能会出现运行时错误
function isFish(animal: Cat | Fish) {
    //  断言animal是Fish类型
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}



// 声明文件
// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
// declare var jQuery: (selector: string) => any;

// 注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
// 导出类
export  class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
// 导出函数
export function create(o:object|null):void{
    console.log('create');
}
// 导出接口
export interface PersonInterface {
    name: string;
    age: number;
}
// 必须先声明，再导出
export default Directions;
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}


// 类型别名，用来给一个类型起一个新名字
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
let name: NameOrResolver = 'tom';

// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
let tuple: [string, number] = ['tuple', 123];
tuple[0] = 'tuple';
tuple[1] = 123;
// tuple = ['tuple', 123,1,'xxx']; // 报错，元组中只能有两个元素，不能有三个或更多
// 可变元祖解构
let [name1,age1,...rest]:[string,number,...any[]] = ['tom',1,'rest1',123,'rest2',true];

// 枚举类型 用来取值被限定在一定范围内的场景，比如性别、方向、状态等
// 数字枚举成员会被赋值为从 0 开始加1递增的数字
enum Days {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}
let day:Days = Days.Sun; // 得到0，因为Sun的值为0，Mon的值为1，Tue的值为2，Wed的值为3，Thu的值为4，Fri的值为5，Sat的值为6

// 字符串枚举成员会被赋值为字符串
enum Days1 {
    Sun = 'Sun',
    Mon = 'Mon',
    Tue = 'Tue',
    Wed = 'Wed',
    Thu = 'Thu',
    Fri = 'Fri',
    Sat = 'Sat'
}
let day1:Days1 = Days1.Sun; // 得到Sun，


// 定义一个动物类
class AnimalClass {
    // private active: string;
    protected food: string;
    constructor(name: string,food:string) {
        this.name = name;
        this.food = food;
    }
    eat():void{
        console.log('eat');
    }
    // 使用 getter 和 setter 可以改变属性的赋值和读取行为
    get name():string{
        return this.name;
    }
    set name(name:string){
        this.name = name;
    }
}

// 定义一个人的类
class People   {
    name:string;
    age:number;
    static num:number = 0;
    constructor(name: string,age:number) {
        this.name = name;
        this.age = age;
        People.num++;
    }
    eat():void{
        console.log('people eat');
    }
}
let people1 = new People('你的名字',18);
people1.eat(); // 输出people eat
console.log(People.num); // 输出1

// 继承
class Cat extends AnimalClass {
    private age:number;
    constructor(name: string,age:number,food:string) {
        super(name,food);
        this.age = age;
        // this.active = 'active'; // 报错，使用 private 修饰的属性或方法，在子类中也是不允许访问的
    }
    eat():void{
        console.log('cat eat');
    }
}
let cat1 = new Cat('cat',123,''); //必须传入三个参数，否则会报错
cat1.eat(); // 输出cat eat
// cat1.age = 123; // 报错，age是私有属性，不能直接修改

//抽象类是不允许被实例化的，只能被继承，抽象类中的抽象方法必须在子类中实现
abstract class AnimalAbstract {
    abstract eat():void;
}
// let catAbstract = new AnimalAbstract(); // 报错，抽象类不能被实例化
class CatAbstract extends AnimalAbstract {
    eat():void{
        console.log('cat eat');
    }
}
let cat2 = new CatAbstract();
cat2.eat(); // 输出cat eat

// 类实现接口，类必须实现接口中的所有方法
interface AnimalInterface {
    eat():void;
}
interface PeopleInterface {
    run():void;
}
class CatInterface implements AnimalInterface, PeopleInterface {
    eat():void{
        console.log('cat eat');
    }
    run():void{
        console.log('people run');
    }
}   
let cat3 = new CatInterface();
cat3.eat(); // 输出cat eat
cat3.run(); // 输出people run


// 泛型用来约束类、接口或方法的参数类型，使参数类型可以变化，而不必事先指定
function createArray<T>(length:number ,value:T):T[]{
    let result:T[] = [];
    for(let i = 0; i < length; i++){
        result[i] = value;
    }
    return result;
}
let result1 = createArray<number>(3,6); // 输出[6,6,6]
let result2 = createArray<string>(3,'aa'); // 输出['aa','aa','aa']


// 泛型约束
interface Lengthwise {
    length: number;
}
// function loggingIdentity1<T>(arg: T): T {
//     console.log(arg.length); // 报错，T 上不存在 length 属性
//     return arg;
// }

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
loggingIdentity2('hello'); // 输出5
loggingIdentity2({length:10}); // 输出10



// 类型守卫就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型
// 自定义类型守卫，检查数组类型，一个值是否是字符串数组：
function isStringArray(value: any): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string"); 
}

function logArray(value: any) {
    if (isStringArray(value)) {
        console.log("String array:", value.join(", "));  // value 被缩小为 string[]
    } else {
        console.log("Not a string array:", value);
    }
}

logArray(["apple", "banana"]);  // 输出: String array: apple, banana
logArray([1, 2, 3]);            // 输出: Not a string array: [1, 2, 3]
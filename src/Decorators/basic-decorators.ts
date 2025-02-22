// 带参数的装饰器
function FirstClassDecorator(param: any) {
    return function(target: any) {
        let newTarget = new target();
        newTarget.buy();
        console.log("装饰器的类",target.name);
        console.log("装饰器的参数",param);
    }
}

@FirstClassDecorator("参数")
class CustomerService {
    name: string = "buy";
    constructor() {
        console.log("CustomerService constructor");
    }
    buy() {
        console.log("buy");
    }
    placeOrder() {
        console.log("placeOrder");
    }
}

// 方法装饰器  PropertyDescriptor是描述属性特征的对象类型
/**
 * 
 * @param targetClassPrototype   [roleService.prototype] 目标原型
 * @param methodName 
 * @param methodDescriptor 
 */
function MyMethod(targetClassPrototype:any,methodName:string,methodDescriptor:PropertyDescriptor){
  console.log(methodDescriptor.value); // 打印出方法中的内容  
  return  methodDescriptor
}

// 角色服务类
class RoleService {
  public roleName:string = "manager"
  constructor(){

  }
  @MyMethod
  DistributeRole(){
    console.log("分配角色");
  }
}






// 1. 类装饰器
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// 2. 方法装饰器
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('方法装饰器');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

// 3. 属性装饰器
function Property(target: any, propertyName: string) {
  console.log('属性装饰器');
  console.log(target);
  console.log(propertyName);
}

// 4. 参数装饰器
function Param(target: any, methodName: string, paramIndex: number) {
  console.log('参数装饰器');
  console.log(target);
  console.log(methodName);
  console.log(paramIndex);
}

// 使用装饰器的示例类
@Logger('正在创建 Person 类')
class Person {
  @Property
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @Log
  sayHello(@Param message: string) {
    console.log(`${this.name} says: ${message}`);
  }
}

// 测试代码
const person = new Person('Alice');
person.sayHello('Hello, Decorators!');

// 实用装饰器示例：只读属性装饰器
function ReadOnly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

// 实用装饰器示例：性能监控装饰器
function measureTime(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${key} 方法执行时间: ${end - start}ms`);
    return result;
  };

  return descriptor;
}

// 实用装饰器示例：验证装饰器
function Validate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    if (args.length === 0) {
      throw new Error('参数不能为空！');
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// 使用实用装饰器的示例类
// class Example {
//   @ReadOnly
//   public name: string = 'Example';

//   @measureTime
//   public slowMethod() {
//     // 模拟耗时操作
//     let sum = 0;
//     for (let i = 0; i < 1000000; i++) {
//       sum += i;
//     }
//     return sum;
//   }

//   @Validate
//   public greet(name: string) {
//     return `Hello, ${name}!`;
//   }
// }

// 测试实用装饰器
// const example = new Example();
// console.log(example.slowMethod());
// console.log(example.greet('World')); 
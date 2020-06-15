class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`Animal ${this.name} falando`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`Cão ${this.name} (${this.type}) latindo`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`Gato ${this.name} (${this.type}) miando`);
  }
}

const animal = new Animal('Bryan');
const dog = new Dog('Yui', 'Vira-lata');
const cat = new Cat('Mirtes', 'Frajola');

animal.speak();
dog.speak();
cat.speak();

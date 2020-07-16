var value = 100

function sayHi() {
    console.log('Hi')
}

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    talk() {
        console.log('name:', this.name)
        console.log('age:', this.age)
        sayHi()
    }
}

export { sayHi, Person }

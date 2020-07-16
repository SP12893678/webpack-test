export default class Pet {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    talk() {
        console.log('name:', this.name)
        console.log('age:', this.age)
    }
}

import * as Person from './js/person'
import Pet from './js/pet'

/**Person test */
Person.sayHi()
var person = new Person.Person('Teddy', 21)
person.talk()
console.log(Person)

/**Pet test */
var pet = new Pet('cat', 1)
pet.talk()
console.log(pet)

# required-pm
ensures all required parameters are defined. e.g. required({firstName, lastName}) => Error: lastName is required


## Purpose

`required-pm` checks all the required parameters to ensure they are not null. Using ES6, it is smart enough to
return the list of null parameters by their parameters names.

Instead of this:
```js
function addUser(firstName, lastName, phone, email, address) {
    // firstName and lastName are required fields
    if (firstName == null) throw new Error("firstName is required")
    if (lastName == null) throw new Error("lastName is required")
    // ..... the rest of code
}
```
You can do this:
```js
required({firstName, lastName})     // using ES6 to identify offending parameters by name
```


## Usage

`required-pm` comes with 4 modes of operations:
* `throw` - throws an exception for the first null parameter (recommended usage)
* `throwAll` - throws an exception listing all null parameters
* `first` - returns the name of first null parameter
* `list` - returns the list of all null parameters

## Example 1: Validate parameters and throw exception

```js
const required = require('required-pm').throw

function addUser(firstName, lastName, phone, email, address) {
    // only firstName and lastName are required
    required({firstName, lastName})
    console.log(`You have added user ${firstName} ${lastName}.`)
}

addUser('Tim', 'Dalton')            // successs
addUser('Scott', null, '555-1212')  // error: lastName is required
```


## Example 2: Working with objects instead
Assuming the incoming data is already in object form
```js
const required = require('required-pm').throw

function addUser(user) {
    // only firstName and lastName are required
    var {firstName, lastName} = user;
    required({firstName, lastName})
    console.log('You have added user ' + JSON.stringify(user))
}

// user input is already collected into an object
addUser({firstName: 'Tim', lastName: 'Dalton'})     // successs
addUser({firstName: 'Scott', phone: '555-1212'})    // error: lastName is required
```


## Example 3: Returns all null fields

```js
const required = require('required-pm').list

function addUser(firstName, lastName, phone, email, address) {
    let missing = required({firstName, lastName})
    if (missing.length > 0) console.log("missing fields " + JSON.stringify(missing))
    else console.log(`You have added user ${firstName} ${lastName}.`)
}

addUser('Tim', 'Dalton')            // successs
addUser(null, null, '555-1212')     // missing fields ["firstName","lastName"]
```


## Example 4: Returns first null field

```js
const required = require('required-pm').first

function addUser(firstName, lastName, phone, email, address) {
    let missing = required({firstName, lastName})
    if (missing) console.log("missing " + missing)
    else console.log(`You have added user ${firstName} ${lastName}.`)
}

addUser('Tim', 'Dalton')            // successs
addUser(null, null, '555-1212')     // missing firstName
```


## Ensure

`ensure` is a slightly modified version of `required-pm`. It also checks for false value. This allows user to perform comparison validation.

```js
const ensure = required('required-pm/ensure').throw

function addUser(firstName, lastName, age, phone, email, address) {
    // firstName and lastName are required
    // must be 18 years old
    ensure({firstName, lastName, age: age >= 18})
    console.log(`You have added user ${firstName} ${lastName} of age ${age}.`)
}

addUser('Jim', 'Smith', 30)
addUser('Adam', 'Kidd', 10)
```


## Other preconfigured settings

```js
// throws exception that lists all null fields
const required = required('required-pm').throwAll

// ensure has all counter-parts
const ensure = required('required-pm/ensure').list
const ensure = required('required-pm/ensure').first
const ensure = required('required-pm/ensure').throwAll
```

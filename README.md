# required-pm
ensures all required parameters are defined. For example, if a user forgets to enter lastName,
required({firstName, lastName}) would throw an error "lastName is required"


## Purpose

`required-pm` checks all the required parameters to ensure they are not null. Using ES6, it is smart enough to
return the list of null parameters by their parameters names.

Instead of this:
```js
function addUser(firstName, lastName, phone, email, address) {
    // firstName, lastName and email are required fields
    if (firstName == null) throw new Error("firstName is required")
    if (lastName == null) throw new Error("lastName is required")
    if (email == null) throw new Error("email is required")
    // ..... the rest of code
}
```
You can do this:
```js
    // `required-pm` verifies all fields for you
    // and is smart enough to return names of the missing field(s)
    required({firstName, lastName, email})
```


## Usage

`required-pm` comes with 4 modes of operations:
* `throw` - throws an exception for the first null parameter (recommended usage)
* `throwAll` - throws an exception listing all null parameters
* `first` - returns the name of first null parameter
* `list` - returns the list of all null parameters


# `throw` Mode

validates the parameters and throws exception if null

## Example 1: when user inputs come in as parameters
```js
const required = require('required-pm').throw

function addUser(firstName, lastName, phone, email, address) {
    // only firstName and lastName are required
    required({firstName, lastName})
    console.log(`You have added user ${firstName} ${lastName}.`)
}

addUser('Tim', 'Dalton')            // successs
addUser('Scott', null, '555-1212')  // throws: lastName is required
```

## Example 2: when user inputs come in as a JS object
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
addUser({firstName: 'Scott', phone: '555-1212'})    // throws: lastName is required
```


# Other modes

## `first` mode example
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

## `list` mode example
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


## `throwAll` mode example
```js
const required = require('required-pm').throwAll

function addUser(firstName, lastName, phone, email, address) {
    // only firstName and lastName are required
    required({firstName, lastName})
    console.log(`You have added user ${firstName} ${lastName}.`)
}

addUser('Tim', 'Dalton')            // successs
addUser(null, null, '555-1212')     // throws: firstName, lastName are required
```


# FAQ
1. Does `required-pm` contain ES6 code?
* `required-pm` does not contain ES6 code itself, so there is no need to transpile
it using Babel.

2. What qualifies as valid parameter in `required-pm`?
* A field is considered missing if its value is `undefined` or `null`. We designed it
this way to make `required-pm` most convenient to use. We may in the future introduce
a mode that only checks for `undefined`.

3. Does `required-pm` support multiple modes of operation?
* We are trying to keep `required-pm` as simple to use as possible, so there is
no immediate plan to improve support of mixed mode operation. If you have a use
case that can benefit from mixed mode operation, drop us a note at GitHub issues
page. We'll keep the suggestions in mind when/if we design mixed mode support. For now,
you can do this instead:
```js
// don't specify which mode is used
const required = require('required-pm')

function addUser(firstName, lastName, phone, email, address) {
    // specify mode at usage
    required.throw({firstName, lastName})
    let warnings = required.list({phone, email})
    if (warnings.length > 0) console.log('Warning: missing ' + JSON.stringify(missing))
    console.log(`You have added user ${firstName} ${lastName}.`)
}
```

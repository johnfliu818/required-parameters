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
    // ...... the rest of code
}

// if firstName is null, it will throw an error: firstName is required
// if lastName is null, it will throw: lastName is required
// if both fields are null, it will throw: firstName is required
```


## Example 2: Returns all null fields

```js
const required = require('required-pm').list

function addUser(firstName, lastName, phone, email, address) {
    let missing = required({firstName, lastName})
    if (missing.length > 0) { /* handle missing fields */ }
    // ...... the rest of code
}

// if both fields are defined, it will return []
// if firstName is null, it will return ['firstName']
// if both fields are null, it will return ['firstName', 'lastName']
```


## Example 3: Returns first null field

```js
const required = require('required-pm').first

function addUser(firstName, lastName, phone, email, address) {
    let missing = required({firstName, lastName})
    if (missing) { /* handle missing fields */ }
    // ...... the rest of code
}

// if both fields are defined, it will return undefined
// if firstName is null, it will return 'firstName'
// if both fields are null, it will still return 'firstName'
```


## Ensure

`ensure` is a slightly modified version of `required-pm`. It also checks for false value. This allows user to perform comparison validation.

```js
const ensure = required('required-pm/ensure').throw

function addUser(firstName, lastName, age, phone, email, address) {
    // firstName and lastName are required
    // must be 18 years old
    ensure({firstName, lastName, age: age >= 18})
    // ...... the rest of code
}

// it will throw error if validation fails
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

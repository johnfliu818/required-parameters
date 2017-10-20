# required-parameters
Easily tests whether all required parameters are defined


## Purpose

It would be nice if we can easily ensure that all required parameters are defined, instead of
having to validate them individually, like below:
```js
function addUser(firstName, lastName, phone, email, address) {
    // firstName and lastName are required fields
    if (firstName == null) throw new Error("firstName is required")
    if (lastName == null) throw new Error("lastName is required")
    // ..... the rest of code
}
```
With `required-parameters` you only need to do
```js
required({firstName, lastName})
```


## Usage

`required-parameters` will check to ensure all the parameters are not null.
When there are null parameters, it will either return the list of null parameters,
or throw an error. Notice ES6 object syntax is recommended for using with this package.


## Example 1: Validate parameters and throw exception

```js
const required = require('required-parameters')

function addUser(firstName, lastName, phone, email, address) {
    required({firstName, lastName})
    // ...... the rest of code
}

// if firstName is null, it will throw an error:
// missing required fields: firstName
// if both fields are null, it will throw:
// missing required fields: firstName, lastName
```


## Example 2: Returns all null fields

```js
const required = require('required-parameters').list

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
const required = require('required-parameters').first

function addUser(firstName, lastName, phone, email, address) {
    let missing = required({firstName, lastName})
    if (missing) { /* handle missing fields */ }
    // ...... the rest of code
}

// if both fields are defined, it will return undefined
// if firstName is null, it will return 'firstName'
// if both fields are null, it will still return 'firstName'
```


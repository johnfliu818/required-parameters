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
Its can either be customized to throw an exception or returns the list of null parameters.
Notice ES6 object syntax is recommended for using with this package.


## Example 1: Validate parameters and throw exception

```js
const required = require('required-parameters')

function addUser(firstName, lastName, phone, email, address) {
    required({firstName, lastName})
    // ...... the rest of code
}

// if firstName is null, it will throw an error: firstName is required
// if lastName is null, it will throw: lastName is required
// if both fields are null, it will throw: firstName is required
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


## Ensure

`ensure` is a slightly modified version of `required-paramters`. It also checks for false value. This allows user to perform comparison validation.

```js
const ensure = required('required-parameters').ensure

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
const required = required('required-parameters').throwsAll

// ensure has all counter-parts
const ensure = required('required-parameters').ensureList
const ensure = required('required-parameters').ensureFirst
const ensure = required('required-parameters').ensureThrowsAll
```

`required-parameters` provides a customize feature that fine-tunes its behavior. Further documentation will be forthcoming on this feature.
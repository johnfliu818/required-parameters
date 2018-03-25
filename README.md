# required-pm
[![NPM](https://nodei.co/npm/required-pm.png)](https://npmjs.org/package/required-pm)

ensures all required parameters are not null, or throws a useful error like "phone is required"


## Purpose

When I am creating a sign-up form for users, I typically ask for `First Name`, `Last Name`, `email`, `phone`, `address`.
Some of these fields are required and we would not allow the sign up to proceed until they are filled in. `required-pm`
simplifies the error checking process and returns meaningful messages when a required field is not filled in.

### Usage
```js
const required = require('required-pm').throw

function signUp(firstName, lastName, phone, email, address) {
    // firstName, lastName and email are required fields
    required({firstName, lastName, email})
    // ..... the rest of code
}
```

Just one line of code, and `required-pm` would check all these fields to ensure they are not null or undefined, and
throws meaningful error like `firstName is required` if a field is null.


## Customizable

An optional parameter can be used to customize what require-pm checks for.

E.g. checks for `undefined` only
```js
required({firstName, lastName, email}, 'u')
```

checks for `undefined`, `null` and `''`
```js
required({firstName, lastName, email}, 'snu')
```

checks for `undefined`, `null`, `''`, `false` and `0`
```js
required({firstName, lastName, email}, 'snzfu')     // I was shooting for snafu :)
```

### Modes

Instead of throwing errors, required-pm can return the list of empty fields instead
```js
const required = require('required-pm').list

function signUp(firstName, lastName, phone, email, address) {
    required({firstName, lastName, email})  //=> returns the list of empty fields instead of throwing an error
    // ..... the rest of code
}
```

## More Documentation
Click [here](https://github.com/highmountaintea/required-parameters/blob/master/Documentation.md) for more detailed documentation.

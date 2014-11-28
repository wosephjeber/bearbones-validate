Bearbones Validate
==============

An object-oriented Javascript form validator. Still in the works.

##Usage

Form validations can be set up with: `variable = new FormValidator(formObject, options);` where `formObject` is a jQuery object and `options` is an object. More details on the options below.

For example, to set up client-side validations straight out of the box:

```javascript
form1 = new FormValidator($('#form-1'));
```

You'll probably want some customizations, though. For example:

```javascript
form1 = new FormValidator($('#form-1'), {
  flashElement: $('#flash'),
  errorMessageClass: 'field-error',
  callback: function() {
    // do something
  }
});
```

Once you've instantiated the class, you can access its public methods:

```javascript
// display a message in the flash element:
form1.flash("Whoa, don't do that!");

// The validate() method is automatically attached to the submit handler,
// but you can trigger it manually. It returns an object with the results,
// so you might want to store those in a variable.
var result = form1.validate();
```

##Options

All options are optional.

|Option|Type|Description|
|------|----|-----------|
|callback|function| |
|customValidations|array of objects| |
|errorClass|string| |
|errorMessageClass|string| |
|flashElement|jQuery object| |
|submitButton|jQuery object| |
|showError|function| |
|showFlash|function| |

The customValidations option allows you to specify custom fields and rules to validate. Out of the box, only required fields and email inputs are validated. The options for customValidation objects are:

|Option|Type|Description|
|------|----|-----------|
|element|jQuery object|The field to validate. Optional.|
|localScope|boolean|If `true`, will only validate fields if they are children of the form being validated. Defaults to `false`. Optional.|
|rule|function|The validation rule that determines if the field passes or not. Must return a boolean. Required.|
|message|string|The message that should appear with the input. Optional.|
|flash|string|The message that should appear in the flash element. Optional.|

*Documentation still in process*

##Methods

|Method|Description|
|------|-----------|
|validate()|Triggers validation of the form. Returns the error object (more documentation below).|
|validateEmail(string)|Validates a string for valid email syntax. Returns boolean.|
|processing(boolean)|Shows/hides the processing message. Returns nothing.|
|flash(string)|Displays a message in the flash element. Returns nothing.|
|clearErrors()|Clears error messages, both in the flash element and on each input. Returns nothing.|
|displayErrors(obj)|Displays error messages in flash element and on each input. Expects the error object returned by the validate() method. Returns nothing.|
|displayFieldError(field, errorMessage)|Display error message on single field. Returns nothing|

The `validate()` method returns an object with the following data:

```javascript
{
  success: boolean,
  errors: [
    {
      element: DOM object,
      message: string
    },
    ...
  ],
  messages: [string,...] 
}
````

*Documentation still in process*

##FAQs

**Q:** Why am I building a Javascript form validator when so many already exist?

**A:** I wanted the challenge, and the other validation scripts I have seen are pretty large and do more than I need them to. I wanted to create a lightweight library to do exactly what I needed it to do.

**Q:** Am I aware that I misspelled "barebones"?

**A:** Yes, it was intentional. Object-oriented programming was first explained to me using bears, and I'm trying to make this validator library as minimal as possible to suit my needs.

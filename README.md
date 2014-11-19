form-validator
==============

An object-oriented Javascript form validator. Still in the works.

##Usage

Form validations can be set up with: `variable = new formValidator(formObject, options);` where `formObject` is a jQuery object and `options` is an object. More details on the options below.

For example, to set up client-side validations straight out of the box:

```javascript
form1 = new formValidator($('#form-1'));
```

You'll probably want some customizations, though. For example:

```javascript
form1 = new formValidator($('#form-1'), {
  flashElement: $('#flash'),
  errorMessageClass: 'field-error',
  callback: function() {
    // do something
  }
});
```

##Options

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

*Documentation still in process*

##Methods

|Method|Description|
|------|-----------|
|validate()|Triggers validation of the form. Returns the error object (more documentation below).|
|validateEmail(string)|Validates a string for valid email syntax. Returns boolean.|
|processing(boolean)|Shows/hides the processing message. Returns nothing.|
|flash(string)|Displays a message in the flash element. Returns nothing.|

*Documentation still in process*

##FAQs

**Q:** Why am I building a Javascript form validator when so many already exist?

**A:** I wanted the challenge, and the other validation scripts I have seen are pretty large and do more than I need them to. I wanted to create a lightweight library to do exactly what I needed it to do.

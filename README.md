form-validator
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

Once you've instantiated the class, you can access it's public methods:

```javascript
// display a message in the flash element:
form1.flash("Whoa, don't do that!");

// The validate() method is automatically attached to the submit handler,
// but you can trigger it manually. It returns an object with the results,
// so you might want to store those in a variable.
var result = form1.validate();
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

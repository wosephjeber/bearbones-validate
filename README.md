form-validator
==============

An object-oriented Javascript form validator. Still in the works.

##Usage

Form validations can be set up with: `validator = new formValidator(formObject, options);` where `formObject` is a jQuery object and `options` is an object. More details on the options below.

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

*Documentation still to come*

##Methods

*Documentation still to come*

##FAQs

**Q:** Why am I building a Javascript form validator when so many already exist?

**A:** I wanted the challenge, and the other validation scripts I have seen are pretty large and do more than I need them to. I wanted to create a lightweight library to do exactly what I needed it to do.

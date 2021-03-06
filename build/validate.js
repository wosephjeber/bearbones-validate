var FormValidator = function(form, options) {
  
  // private function to check and convert DOM object to jQuery object
  objectivize = function(obj) {
    return (obj instanceof jQuery) ? obj : $(obj);
  };
  
  // cache this
  var _this = this;
  
  // set some variables
  this.form = objectivize(form);
  
  // set defaults
  this.options = {
    callback: function() { _this.processing(false); $(this).submit(); },
    flashElement: $('.flash', _this.form),
    submitButton: $('input[type="submit"]', _this.form),
    showFlash: function() { $(this).slideDown(500); },
    showError: function(element, errorMessage) { $(errorMessage).slideDown(500); },
    errorClass: 'error',
    errorMessageClass: 'error-message',
    customValidations: []
  };
  
  // extend defaults with options argument
  options = options || {};
  $.extend(this.options, options);
  
  // validate form
  this.validate = function() {
    var form = _this.form;
    var errorObj = {
      success: true,
      errors: [],
      messages: []
    },
    missingFields = 0;
    
    // validate email address
    form.find('[type="email"]').each(function(index, element) {
      var email = $(element).val();
      if (!_this.validateEmail(email)) {
        errorObj.messages.push('Enter valid email address. ');
        errorObj.errors.push({
          element: element,
          message: 'Invalid email'
        });
      }
    });
    
    // validate required fields
    form.find('[required]').each(function(index, element) {
      var val = $(element).val();
      var placeholder = $(element).attr('placeholder');
      if ((val === '' || val === placeholder) && $(element).is(':visible')) {
        missingFields ++;
        element = $(element).is('select') ? $(element).parents('.select') : element;
        errorObj.errors.push({
          element: element,
          message: 'Required field'
        });
      }
    });
    
    // add custom validations
    $.each(_this.options.customValidations, function(index, validation) {
      var errors = false;
      if (validation.element) {
        $.each(validation.element, function(index, element) {
          element = validation.localScope ? _this.form.find(element) : element;
          if (!validation.rule.call(element)) {
            errorObj.errors.push({
              element: element,
              message: validation.message
            });
            errors = true;
          }
        });
      } else {
        if (!validation.rule.call()) {
          errors = true;
        }
      }
      if (errors) errorObj.messages.push(validation.flash);
    });
    
    // if there are errors
    if (errorObj.errors.length > 0) {
      errorObj.success = false;
      
      // if there are missing required fields
      if (missingFields > 0) {
        errorObj.messages.push('Fill out all required fields. ');
      }
    }
    
    return errorObj;
  };
  
  // helper function to validate email with regex
  this.validateEmail = function(email) {
    var re = /^[0-9a-zA-Z][-.+_a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,6}$/;
    return re.test(email);
  };
  
  // helper function to clear errors
  this.clearErrors = function() {
    _this.form.find('.' + _this.options.errorClass).removeClass(_this.options.errorClass);
    _this.form.find('.' + _this.options.errorMessageClass).remove();
    _this.options.flashElement.html('');
  };
  
  // display errors
  this.displayErrors = function(errorObj) {
    _this.clearErrors();
    
    $.each(errorObj.errors, function(index, obj) {
      if (objectivize(obj.element).attr('type') !== 'hidden') {
        _this.displayFieldError(obj.element, obj.message);
      }
    });
    
    var errorMessage = '';
    
    $.each(errorObj.messages, function(index, message) {
      errorMessage += message;
    });
    
    _this.flash(errorMessage.trim());
  };
  
  // display flash message
  this.flash = function(message) {
    _this.options.flashElement.html(message);
    
    _this.options.showFlash.call(_this.options.flashElement);
  };
  
  this.displayFieldError = function(field, errorMessage) {
    var errorElement = $('<div class="' + _this.options.errorMessageClass + '">' + errorMessage + '</div>');
    $field = objectivize(field);
    $field.addClass(_this.options.errorClass).after(errorElement);
    _this.options.showError.call(errorMessage, errorMessage, errorElement);
  };
  
  this.processing = function(isProcessing) {
    if (isProcessing) {
      _this.options.submitButton.hide();
      _this.options.submitButton.siblings('.processing-donation').show();
    } else {
      _this.options.submitButton.show();
      _this.options.submitButton.siblings('.processing-donation').hide();
    }
  };
  
  // set up submit handler on form
  this.setUpSubmitHandler = function() {
    _this.form.on('submit', function() {
      _this.processing(true);
      var result = _this.validate();
      if (result.success) {
        _this.clearErrors();
        _this.options.callback.call(_this.form);
      } else {
        _this.processing(false);
        _this.displayErrors(result);
      }
      return false;
    });
  };
  
  this.setUpSubmitHandler();
};

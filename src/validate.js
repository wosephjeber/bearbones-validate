var formValidator = function(form, options) {
  
  // cache this
  var _this = this;
  
  // set some variables
  this.form = form;
  
  // set defaults
  this.options = {
    callback: function() { $(this).submit() },
    flashElement: $('.flash', _this.form),
    showFlash: function() { $(this).slideDown(500) },
    showError: function(element, errorMessage) { $(errorMessage).slideDown(500) },
    errorClass: 'error',
    errorMessageClass: 'error-message',
    customValidations: [],
  }
  
  // extend defaults with options argument
  var options = options || {};
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
        errorObj.messages.push('Enter valid email address. ')
        errorObj.errors.push({
          element: element,
          message: 'Invalid email'
        })
      }
    })
    
    // validate required fields
    form.find('[required]').each(function(index, element) {
      var val = $(element).val();
      var placeholder = $(element).attr('placeholder');
      if ((val === '' || val === placeholder) && $(element).is(':visible')) {
        missingFields ++;
        errorObj.errors.push({
          element: element,
          message: 'Required field'
        })
      }
    })
    
    // add custom validations
    $.each(_this.options.customValidations, function(index, validation) {
      var validation = validation;
      $.each(validation.element, function(index, element) {
        if (!validation.rule.call(_this.form.find(element))) {
          errorObj.errors.push({
            element: _this.form.find(element),
            message: validation.message
          })
          errorObj.messages.push(validation.flash);
        }
      })
    })

    // if there are errors
    if (errorObj.errors.length > 0) {
      errorObj.success = false;
      
      // if there are missing required fields
      if (missingFields > 0) {
        errorObj.messages.push('Fill out all required fields. ');
      }
    }
    
    return errorObj;
  }
  
  // helper function to validate email with regex
  this.validateEmail = function(email) {
    var re = /^[0-9a-zA-Z][-.+_a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
  
  // helper function to clear errors
  this.clearErrors = function() {
    _this.form.find('.' + _this.options.errorClass).removeClass(_this.options.errorClass);
    _this.form.find('.' + _this.options.errorMessageClass).remove();
    _this.options.flashElement.html('');
  }
  
  // display errors
  this.displayErrors = function(errorObj) {
    _this.clearErrors();
    
    $.each(errorObj.errors, function(index, obj) {
      var errorElement = $('<div class="' + _this.options.errorMessageClass + '">' + obj.message + '</div>');
      $(obj.element).addClass(_this.options.errorClass).after(errorElement);
      _this.options.showError.call(obj.element, obj.element, errorElement);
    })
    
    var errorMessage = '';
    
    $.each(errorObj.messages, function(index, message) {
      errorMessage += message;
    })
    
    _this.flash(errorMessage.trim());
  }
  
  // display flash message
  this.flash = function(message) {
    _this.options.flashElement.html(message);
    
    _this.options.showFlash.call(_this.options.flashElement);
  }
  
  // set up submit handler on form
  this.setUpSubmitHandler = function() {
    _this.form.on('submit', function() {
      var result = _this.validate();
      if (result.success) {
        _this.clearErrors();
        _this.options.callback.call(_this.form);
      } else {
        _this.displayErrors(result);
      }
      return false;
    })
  }
  
  this.setUpSubmitHandler();
}

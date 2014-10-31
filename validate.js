var formValidator = function(form, callback, options) {
  var _this = this;
  
  this.form = form;
  this.callback = callback;
  this.flashElement = $('.flash', this.form);
  this.errorClass = 'error';
  this.errorMessageClass = 'error-message';
  
  this.validate = function() {
    var form = _this.form;
    var errorMessages = [],
        errorMessage = '',
        errorObj = {
          success: true,
          errors: [],
          message: null,
        },
        missingFields = 0;
    
    form.find('[required]').each(function(index, element){
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
    
    if (errorObj.errors.length > 0) {
      errorObj.success = false;
      
      if (missingFields > 0) {
        errorMessages.push('Fill out all required fields. ')
      }
    }
    
    $.each(errorMessages, function(index, message) {
      errorMessage += message;
    })
    
    errorObj.message = errorMessage.trim();
    
    return errorObj;
  }
  
  this.clearErrors = function() {
    _this.form.find('.' + _this.errorClass).removeClass(_this.errorClass);
    _this.form.find('.' + _this.errorMessageClass).remove();
    _this.flashElement.html('');
  }
  
  this.displayErrors = function(errorObj) {
    _this.clearErrors();
    $.each(errorObj.errors, function(index, error) {
      $(error.element).addClass(_this.errorClass).after('<span class="' + _this.errorMessageClass + '">' + error.message + '</span>');
    })
    
    _this.flashElement.html(errorObj.message);
  }
  
  this.setUpSubmitHandler = function() {
    _this.form.on('submit', function() {
      var result = _this.validate();
      if (result.success) {
        _this.clearErrors();
        _this.callback();
      } else {
        _this.displayErrors(result);
      }
      return false;
    })
  }
  
  this.setUpSubmitHandler();
}

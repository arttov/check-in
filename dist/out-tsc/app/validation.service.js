var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': 'Required',
            'minlength': "Minimum length " + (validatorValue ? validatorValue.requiredLength : 0) + " symbols",
            'maxlength': "Maximum length " + (validatorValue ? validatorValue.requiredLength : 0) + " symbols",
            'invalidUserName': 'User name must be only letter'
        };
        return config[validatorName];
    };
    ValidationService.userNameValidator = function (control) {
        if (control.value.match(/^([a-zA-Z ]){1,50}$/)) {
            return null;
        }
        else {
            return { 'invalidUserName': true };
        }
    };
    return ValidationService;
}());
export { ValidationService };
//# sourceMappingURL=/var/www/html/check-in/src/app/validation.service.js.map
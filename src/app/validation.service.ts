export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Required',
      'minlength': `Minimum length ${validatorValue ? validatorValue.requiredLength : 0}`,
      'invalidUserName': 'User name must be only letter'
    };

    return config[validatorName];
  }

  static userNameValidator(control) {
    if (control.value.match(/^([a-zA-Z ]){1,50}$/)) {
      return null;
    } else {
      return { 'invalidUserName': true };
    }
  }

}

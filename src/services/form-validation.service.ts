import {validate} from "class-validator";

export class FormValidationService {

  static async validateForm(form: any, validator: any) {
    for (const field in form) {
      const value = form[field];
      validator[field] = value === "" ? null : value;
    }
    const errors = await validate(validator, {validationError: {target: false}});
    const result: any = {};

    for (const error of errors) {
      if (error.constraints) {
        result[error.property] = error.constraints[Object.keys(error.constraints)[0]];
      }
    }

    return result;
  }

}

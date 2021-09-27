import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsTrue(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSameAs',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _: ValidationArguments) {
          return value === true;
        },
      },
    });
  };
}

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// Validador personalizado. Se usa en el DTO con @Validate(MatchPassword) sobre confirmPassword:
@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    // args.object es el body completo de la solicitud:
    const body = args.object as { password: string };
    return confirmPassword === body.password;
  }

  defaultMessage(): string {
    return 'Las contraseñas no coinciden';
  }
}

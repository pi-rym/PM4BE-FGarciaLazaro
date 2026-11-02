import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, MinLength, minLength, Validate } from 'class-validator';
import { Users } from '../users.interface';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { MatchPassword } from 'src/common/validators/match-password.validator';

export class CreateUserDto implements Omit<Users, 'id'> {
  @IsEmail({}, { message: 'El email debe tener un formato válido, por eje: nombre@dominio.com' })
@MaxLength(50, { message: 'El email no puede superar los 50 caracteres' })
email!: string;


  @IsString({message: "Nombre debe ser string"})
  @Matches(/^\p{L}+( \p{L}+)*$/u, {message:"Nombre solo puede contener letras"})
  @IsNotEmpty({message: "Nombre no puede ser vacio"})
  @MinLength(3, {message: "Nombre de al menos 3 letras"})
  @MaxLength(80, {message: "Nombre no mas de 80 caracteres"})
  name!: string;

  @IsString({message: "Contraseña debe ser string"})
  @MinLength(8, {message: "Contraseña de al menos 8 caracteres"})
  @MaxLength(15, {message: "Contraseña no mas de 15 caracteres"})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {message: "Contraseña debe tener al menos una minuscula, una mayuscula, un numero y uno de estos caracteres: !@#$%^&*"})
  password!: string;

  @IsString({message: "Confirmacion de contraseña debe ser string"})
  @IsNotEmpty({message: "Confirmacion de contraseña es obligatoria"})
  @Validate(MatchPassword)
  confirmPassword!: string;

  @IsString({message: "Direccion debe ser string"})
  @MinLength(3, {message: "Direccion de al menos 3 caracteres"})
  @MaxLength(80, {message: "Direccion no mas de 80 caracteres"})
  address!: string;

  @IsNotEmpty({message: "Telefono es obligatorio"})
  @IsInt({message: "Telefono debe ser un numero entero, sin comillas"})
  @IsPositive({message: "Telefono debe ser un numero positivo"})
  @Max(999999999999999, {message: "Telefono no mas de 15 digitos"})
  phone!: number;

  @IsString({message: "Pais debe ser string"})
  @MinLength(5, {message: "Pais de al menos 5 caracteres"})
  @MaxLength(20, {message: "Pais no mas de 20 caracteres"})
  country!: string;

  @IsString({message: "Ciudad debe ser string"})
  @MinLength(5, {message: "Ciudad de al menos 5 caracteres"})
  @MaxLength(20, {message: "Ciudad no mas de 20 caracteres"})
  city!: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'name', 'password', 'confirmPassword'] as const),
) {}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}

export class ChangePasswordDto {
  @IsString({message: "Contraseña actual debe ser string"})
  @IsNotEmpty({message: "Contraseña actual es obligatoria"})
  currentPassword!: string;

  @IsString({message: "Contraseña nueva debe ser string"})
  @MinLength(8, {message: "Contraseña nueva de al menos 8 caracteres"})
  @MaxLength(15, {message: "Contraseña nueva no mas de 15 caracteres"})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {message: "Contraseña nueva debe tener al menos una minuscula, una mayuscula, un numero y uno de estos caracteres: !@#$%^&*"})
  newPassword!: string;
}



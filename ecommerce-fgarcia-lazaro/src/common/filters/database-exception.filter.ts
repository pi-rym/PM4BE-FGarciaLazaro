import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

// Errores de Postgres que pueden aparecer en cualquier ruta:
const POSTGRES_ERRORS = {
  '23505': { status: HttpStatus.CONFLICT, message: 'Ya existe un registro con esos datos' },
  '23503': { status: HttpStatus.CONFLICT, message: 'La operación no se puede completar porque el registro está relacionado con otros datos' },
  '22001': { status: HttpStatus.BAD_REQUEST, message: 'Uno de los valores supera el largo permitido' },
};

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const code = (exception.driverError as { code?: string })?.code;
    const knownError = code ? POSTGRES_ERRORS[code] : undefined;

    if (knownError) {
      response.status(knownError.status).json({ statusCode: knownError.status, message: knownError.message });
      return;
    }

    // Un error no previsto se registra, pero no se le muestran los detalles al cliente:
    this.logger.error(exception.message, exception.stack);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}

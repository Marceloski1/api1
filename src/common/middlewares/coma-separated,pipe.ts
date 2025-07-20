import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CommaSeparatedPipe implements PipeTransform {
  transform(value: string) {
    return value.split(',').map((v) => v.trim()); //Esto va a devolver una oracion totalmente unida ej: 'Pedrobuscopanundomingo'
  }
}

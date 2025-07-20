import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import allowValuesForExpample from './pipes data/allow-values';
@Injectable()
export class AllowedValuesPipe implements PipeTransform {
  constructor(private readonly allowed: string[]) {}

  transform(value: string) {
    if (!this.allowed.includes(value)) {
      throw new BadRequestException(
        `El valor "${value}" no está permitido. Valores válidos: ${this.allowed.join(', ')}`,
      );
    }
    return value;
  }
}

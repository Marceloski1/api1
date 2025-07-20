import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string')
      ///Esto puede causar conflicto si no se trata adecuadamente
      return value.trim();

    return value;
  }
}

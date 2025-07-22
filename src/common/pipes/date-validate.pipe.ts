import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class DateValidatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`La fecha "${value}" no es válida`);
    }

    return date;
  }
}

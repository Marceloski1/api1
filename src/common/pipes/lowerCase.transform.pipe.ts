import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToLowerCasePipe implements PipeTransform {
  transform(value: any) {
    return typeof value === 'string' ? value.toLowerCase() : value;
  }
}

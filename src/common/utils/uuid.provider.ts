import { Injectable, Scope } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class UuidService {
  private readonly uuid: string = v4();
  ///Idea para una clase que genere uuidv4. Luego veo si es necesaria o no.
  getId() {
    return this.uuid;
  }
}

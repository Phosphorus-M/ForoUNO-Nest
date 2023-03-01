import { Injectable } from '@nestjs/common';
import { SecondService } from './second.service';

@Injectable()
export class AppService {
  constructor(private secondService: SecondService) {}
  getHello(): string {
    return this.secondService.getHello();
  }
}

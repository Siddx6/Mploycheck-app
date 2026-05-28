import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusClass' })
export class StatusBadgePipe implements PipeTransform {
  transform(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
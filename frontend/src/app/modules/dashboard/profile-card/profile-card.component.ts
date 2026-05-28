import { Component, Input } from '@angular/core';
import { User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input() user: User | null = null;

  getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  }
}
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Valor } from '../../interfaces/valor.interface';
import { MatCard, MatCardTitle, MatCardHeader, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-card-value',
  imports: [MatCard, MatCardTitle, MatCardHeader, MatDivider, MatCardContent],
  templateUrl: './card-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card-value.component.css'
})
export class CardValueComponent {
  dato = input.required<Valor>();
}

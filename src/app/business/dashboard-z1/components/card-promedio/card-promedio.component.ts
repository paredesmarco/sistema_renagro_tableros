import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Porcentaje } from '../../interfaces/porcentaje.interface';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-card-promedio',
  imports: [MatCard, MatCardHeader, MatDivider, MatCardContent, MatCardTitle],
  templateUrl: './card-promedio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card-promedio.component.css'
})
export class CardPromedioComponent {
  dato = input.required<Porcentaje>();
}

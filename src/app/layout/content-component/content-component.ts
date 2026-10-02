import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header-component/header.component';

@Component({
  imports: [RouterOutlet,
    HeaderComponent
  ],
  selector: 'app-content',
  styleUrl: './content-component.scss',
  templateUrl: './content-component.html',
})
export class ContentComponent {}

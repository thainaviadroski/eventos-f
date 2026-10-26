import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../service/theme/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  protected readonly theme = inject(ThemeService);

}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface User {
  first_name?: string;
  last_name?: string;
  profile_img_url?: string;
}
@Component({
  imports: [CommonModule],
  selector: 'app-header-component',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user: User = {
    first_name: 'Carlos',
    last_name: 'López',
    profile_img_url: '', // Al estar vacío, mostrará las iniciales "CL"
  };
  // Aquí puedes inyectar el usuario desde tu servicio de Autenticación
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToProfile(): void {
    this.isMenuOpen = false;
    // Agrega la navegación a la vista de perfil (ej. this.router.navigate(['/profile']))
    console.log('Navegar a Profile');
  }

  logout(): void {
    this.isMenuOpen = false;
    // Agrega tu lógica de logout (ej. limpiar token, redireccionar a /login)
    console.log('Cerrando sesión...');
  }

  // Cierra el menú automáticamente si el usuario hace clic fuera de la navbar
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-container')) {
      this.isMenuOpen = false;
    }
  }
}

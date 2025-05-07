import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = { id: 0, name: '', email: '' };
  isEditing = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void { // Cargar usuarios desde el servicio
    this.users = this.usersService.getUsers();
  }

  addUser(): void { // Agregar o actualizar un usuario
    if (this.newUser.name && this.newUser.email) {
      const isDuplicate = this.users.some( // Validar si el email ya existe
        (user) => user.email === this.newUser.email && user.id !== this.newUser.id
      );
      if (isDuplicate) {
        alert('El email ya está registrado. Por favor, usa otro email.');
        return;
      }

      if (this.isEditing) {
        this.usersService.updateUser(this.newUser); // Actualizar usuario existente
        alert('Usuario actualizado correctamente.');
        this.isEditing = false;
      } else {
        const newId = this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) + 1 : 1; // Agregar un nuevo usuario
        this.newUser.id = newId;
        this.usersService.addUser(this.newUser);
        alert('Usuario agregado correctamente.');
      }

      this.newUser = { id: 0, name: '', email: '' }; // Reiniciar el formulario y recargar la lista de usuarios
      this.loadUsers();
    } else {
      alert('Por favor, completa todos los campos antes de continuar.');
    }
  }

  editUser(user: any): void { // Editar un usuario
    this.newUser = { ...user }; // Copiar los datos del usuario al formulario
    this.isEditing = true; // Activar modo de edición
  }

  cancelEdit(): void { // Cancelar edición
    this.newUser = { id: 0, name: '', email: '' }; // Reiniciar el formulario
    this.isEditing = false; // Salir del modo de edición
  }

  deleteUser(id: number): void { // Eliminar un usuario
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.deleteUser(id);
      this.loadUsers();
      alert('Usuario eliminado correctamente.');
    }
  }
}
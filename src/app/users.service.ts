import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private localStorageKey = 'users';

  constructor() {}

  getUsers(): any[] { // Obtener todos los usuarios
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  saveUsers(users: any[]): void { // Guardar usuarios en local storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  addUser(user: any): void { // Agregar un nuevo usuario
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  updateUser(updatedUser: any): void { // Actualizar un usuario existente
    const users = this.getUsers();
    const index = users.findIndex((user: any) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsers(users);
    }
  }

  deleteUser(id: number): void { // Eliminar un usuario
    const users = this.getUsers();
    const filteredUsers = users.filter((user: any) => user.id !== id);
    this.saveUsers(filteredUsers);
  }
}
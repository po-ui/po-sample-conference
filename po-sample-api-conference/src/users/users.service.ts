import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Notes } from 'src/notes/notes.interface';
import { NotesService } from 'src/notes/notes.service';
import { Utils } from 'src/utils/utils';
import { users } from './db/users.data';
import { User, Users, UsersAPI } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private noteService: NotesService) {}

  users = users;

  private getNotesFromUser(user: User): Notes {
    return this.noteService.getNotesFromUser(user.id);
  }

  private getFullUser(user: User): User {
    const notes = this.getNotesFromUser(user);
    return { ...user, notes };
  }

  getUsers(search?: string, page?: string, pageSize?: string): UsersAPI {
    let filteredUsers = this.filter(search);

    filteredUsers = filteredUsers.map(user => this.getFullUser(user));

    filteredUsers = this.paginate(
      filteredUsers,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredUsers,
      hasNext: this.users.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getUser(id: string): User {
    const user = this.users.find(user => user.id === id);
    return this.getFullUser(user);
  }

  delete(id: string): { message: string } {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User ${id} não existe!`);
    }

    this.users[index] = Utils.softDelete(this.users[index]);

    return { message: 'User removida com sucesso' };
  }

  deleteAll(usersToDelete: Users): void {
    usersToDelete.forEach(user => this.delete(user.id));
  }

  save(user: User): User {
    const saved = { ...Utils.completePost(), ...user };
    this.users.push(saved);
    return saved;
  }

  update(id: string, updatedUser: User): User {
    const user = this.getUser(id);
    const updatedDate = new Date().toString();
    const updated = {...user, ...updatedUser, updatedDate}
    this.delete(id);
    return this.save(updated);
  }


  private paginate(filteredUser, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredUser, page, pageSize);
    }

    return filteredUser;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.users) : this.users;
  }

  usersDiffDate(date: string, page?: string, pageSize?: string): UsersAPI {
    let usersDiff = this.users.filter(user => {
      return new Date(user.updatedDate) >= new Date(date);
    });

    usersDiff = this.paginate(
      usersDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    usersDiff = usersDiff.map(user => this.getFullUser(user));

    return {
      items: usersDiff,
      hasNext: this.users.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.users.length };
  }

  async findByUserName(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Utils } from 'src/utils/utils';
import { notes } from './db/notes.data';
import { Note, Notes, NotesAPI } from './notes.interface';

@Injectable()
export class NotesService {
  notes = notes;

  getNotesFromUser(userId: string): Notes {
    return this.notes.filter(note => note.userId === userId);
  }

  getNotes(search?: string, page?: string, pageSize?: string): NotesAPI {
    let filteredNotes = this.filter(search);
    filteredNotes = this.paginate(
      filteredNotes,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredNotes,
      hasNext: this.notes.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getNote(id: string): Note {
    return this.notes.find(note => note.id === id);
  }

  delete(id: string): { message: string } {
    const index = this.notes.findIndex(note => note.id === id);

    if (index === -1) {
      throw new NotFoundException(`Note ${id} não existe!`);
    }

    this.notes[index] = Utils.softDelete(this.notes[index]);
    
    return { message: 'Note removida com sucesso' };
  }

  deleteAll(notesToDelete: Notes): void {
    notesToDelete.forEach(note => this.delete(note.id));
  }

  save(note: Note): Note {
    const saved = { ...Utils.completePost(), ...note };
    this.notes.push(saved);
    return saved;
  }

  update(id: string, updatedNote: Note): Note {
    const note = this.getNote(id);
    const updatedDate = new Date().toString();
    const updated = {...note, ...updatedNote, updatedDate}
    this.delete(id);
    return this.save(updated);
  }

  private paginate(filteredNote, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredNote, page, pageSize);
    }

    return filteredNote;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.notes) : this.notes;
  }

  notesDiffDate(date: string, page?: string, pageSize?: string): NotesAPI {
    let notesDiff = this.notes.filter(note => {
      return new Date(note.updatedDate) >= new Date(date);
    });

    notesDiff = this.paginate(
      notesDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: notesDiff,
      hasNext: this.notes.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.notes.length };
  }
}

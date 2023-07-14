import { defineStore } from 'pinia';

interface Note {
  id: number;
  title: string;
  description: string;
  content: string;
  wordCount?: number;
  createdAt?: string;
  updatedAt: number;
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
    nextId: 1,
    note: {} as Note,
  }),
  getters: {
    allNotes(state): Note[] {
      return state.notes;
    },
    getNoteById(state) {
      return (id: number): Note | undefined => {
        return state.notes.find((note: Note) => note.id === id);
      };
    },
  },
  actions: {
    addNote({
      title,
      content,
      description,
      wordCount,
      createdAt,
      updatedAt
    }: {
      title: string;
      content: string;
      description: string;
      wordCount?: number;
      createdAt?: string;
      updatedAt: number
    }): void {
      const newNote: Note = {
        id: this.nextId,
        title,
        content,
        description,
        wordCount,
        createdAt,
        updatedAt
      };
      this.notes.push(newNote);
      this.nextId++;
      this.saveNotesToLocalStorage();
    },
    loadNotesFromLocalStorage(): void {
      const notesData = localStorage.getItem('notes');
      if (notesData) {
        this.notes = JSON.parse(notesData);
      }
    },
    saveNotesToLocalStorage(): void {
      const notesData = JSON.stringify(this.notes);
      localStorage.setItem('notes', notesData);
    },
    updateNote({
      id,
      title,
      content,
      description,
      wordCount,
      updatedAt,
    }: {
      id: number;
      title: string;
      content: string;
      description: string;
      wordCount?: number;
      updatedAt: number
    }): void {
      const noteIndex = this.notes.findIndex((note: Note) => note.id === id);
      if (noteIndex !== -1) {
        const updatedNote: Note = {
          id,
          title,
          content,
          description,
          wordCount,
          updatedAt
        };
        this.notes[noteIndex] = updatedNote;
        console.log(this.notes);
      }
    },
    deleteNoteById(id: number): void {
      const noteIndex = this.notes.findIndex((note: Note) => note.id === id);
      if (noteIndex !== -1) {
        this.notes.splice(noteIndex, 1);
      }
    },
  },
});

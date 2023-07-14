import { defineStore } from 'pinia';

interface Note {
  id: number;
  title: string;
  description: string;
  content: string;
  wordCount?: number;
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
    nextId: 1,
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
    }: {
      title: string;
      content: string;
      description: string;
      wordCount?: number;
    }): void {
      const newNote: Note = {
        id: this.nextId,
        title,
        content,
        description,
        wordCount
      };
      this.notes.push(newNote);
      this.nextId++;
    },
    updateNote({
      id,
      title,
      content,
      description,
    }: {
      id: number;
      title: string;
      content: string;
      description: string;
    }): void {
      const noteIndex = this.notes.findIndex((note: Note) => note.id === id);
      if (noteIndex !== -1) {
        const updatedNote: Note = {
          id,
          title,
          content,
          description,
        };
        this.notes[noteIndex] = updatedNote;
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

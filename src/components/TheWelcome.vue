<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import ListNote from './ListNote.vue'

const store = useNotesStore()

const { allNotes } = store
const getNotesByRecentlyUpdated = () => {
      return allNotes.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB.getTime() - dateA.getTime();
      });
    };

    const sortedNotes = getNotesByRecentlyUpdated()
</script>

<template>
  <ul
    role="list"
    class="divide-y divide-gray-700 overflow-hidden shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    <ListNote v-for="note in sortedNotes" :key="note.id" :note="note" />
  </ul>
</template>

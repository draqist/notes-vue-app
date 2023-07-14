<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import ListNote from './ListNote.vue'

const store = useNotesStore()

const { allNotes } = store
</script>

<template>
  <ul
    role="list"
    class="divide-y divide-gray-700 overflow-hidden shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    <ListNote v-for="note in allNotes.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() )" :key="note.id" :note="note" />
  </ul>
</template>

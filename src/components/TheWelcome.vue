<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'
import ListNote from './ListNote.vue'
const store = useNotesStore()
const { notes } = storeToRefs(store)
const { allNotes } = store
</script>

<template>
  <ul
    role="list"
    class="divide-y divide-gray-700 overflow-hidden shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    <ListNote v-for="note in allNotes.sort((a, b) => b.id - a.id)" :key="note.id" :note="note" />
  </ul>
</template>

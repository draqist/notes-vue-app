<script setup lang="ts">
import { RouterView } from 'vue-router'
import NoteForm from './components/NoteForm.vue'
import { useNotesStore } from './stores/notes'

const store = useNotesStore()
store.loadNotesFromLocalStorage()
</script>

<template>
  <main class="w-full min-[1280px]:h-[calc(100vh-5rem)]">
    <div class="w-full flex justify-between items-center pr-3 sm:pr-0">
      <h2 class="text-3xl text-white font-extrabold uppercase">Vue Notes</h2>
      <span class="text-primary font-medium text-lg">{{ store.allNotes.length }}</span>
    </div>
    <div class="mt-16 mb-3 w-full">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl">Create a new note</h1>
      </div>
    </div>
    <div class="w-full bg-[#1e1e1e] max-h-screen p-4 py-6 rounded-xl min-h-[590px]">
      <NoteForm formType="create" />
    </div>
  </main>

  <RouterView />
</template>

<style scoped>
input {
  height: 2.85rem;
  width: 100%;
  font-size: 1rem;
  background: transparent;
  outline: transparent solid 2px;
  outline-offset: 2px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #8a8c90a7;
  padding: 0 12px 0;
  color: #8a8c90a7;
  background: #ffffff0a;
  font-size: 14px;
}
textarea {
  min-height: 9.5rem;
  width: 100%;
  font-size: 1rem;
  background: transparent;
  outline: transparent solid 2px;
  outline-offset: 2px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #8a8c90a7;
  background: rgba(255, 255, 255, 0.04);
  padding: 12px;
  color: #8a8c90a7;
}
.desc {
  height: 4rem;
  padding: 8px 12px 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotesStore } from './stores/notes'
import { RouterView } from 'vue-router'
const store = useNotesStore()
const { note } = storeToRefs(store)
const { addNote, allNotes } = store
</script>

<template>
  <main class="w-full min-[1280px]:h-[calc(100vh-5rem)]">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-3xl text-white font-extrabold uppercase">Vue Notes</h2>
      <span class="text-primary font-medium text-lg">{{ allNotes.length }}</span>
    </div>
    <div class="mt-16 mb-3 w-full">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl">Create a new note</h1>
        <div>
          <i class="bi-alarm" fontSize="16px" color="hsl(160,100%, 37%, 1)"></i>
        </div>
        </div>
        <!-- <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav> -->
    </div>
    <div class="w-full bg-[#1e1e1e] max-h-screen p-4 py-6 rounded-xl min-h-[590px]">
      <form
        @submit.prevent="
          addNote({
            title: note.title,
            description: note.description,
            content: note.content,
            wordCount: note.content.split(' ').length,
            date: new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }),
            (note.title = ''),
            (note.description = ''),
            (note.content = '')
        "
      >
        <label for="title" class="text-base">
          Title
          <input
            type="text"
            id="title"
            name="title"
            v-model="note.title"
            class="mt-1 mb-5 placeholder:text-sm focus:border-input"
            placeholder="Title"
          />
        </label>
        <label for="content" class="text-base">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            v-model="note.description"
            class="desc mb-5 text-sm placeholder:text-sm mt-1 focus:border-input"
            placeholder="Title"
          />
        </label>
        <label for="content" class="text-base">
          Content
          <textarea
            type="text"
            id="content"
            name="content"
            v-model="note.content"
            class="mt-1 placeholder:text-sm focus:border-input"
            placeholder="Title"
          />
        </label>

        <button
          type="submit"
          class="inline-flex items-center rounded-lg bg-input px-14 h-[48px] mt-4 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Create
        </button>
      </form>
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

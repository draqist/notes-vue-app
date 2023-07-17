<script setup lang="ts">
import { useNotesStore, type Note } from '@/stores/notes'
import { reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
const props = defineProps({
  note: {
    type: Object as () => Note,
    required: false
  },
  formType: {
    type: String,
    required: true
  },
  editToggle: {
    type: Boolean,
    required: false
  }
})

const store = useNotesStore()
const noteData = reactive(store.note)
const { updateNote, addNote } = store
store.loadNotesFromLocalStorage()
const $toast = useToast()

function handleSubmit() {
  if (props.formType === 'create') {
    if (!noteData.title || !noteData.description || !noteData.content) {
      $toast.warning('Please fill all the fields', {
        position: 'top-right',
        duration: 2000
      })
    }
    addNote({
      title: noteData.title,
      description: noteData.description,
      content: noteData.content,
      wordCount: noteData.content.split(' ').length,
      createdAt: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      updatedAt: Date.now()
    })
  } else {
    updateNote({
      id: noteData.id,
      title: noteData.title,
      description: noteData.description,
      content: noteData.content,
      wordCount: noteData.content.split(' ').length,
      createdAt:
        props?.note?.createdAt ??
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      updatedAt: Date.now()
    })
  }
}
</script>

<template>
  <form
    @submit.prevent="
      handleSubmit(), (noteData.title = ''), (noteData.description = ''), (noteData.content = '')
    "
  >
    <label for="title" class="text-base">
      Title
      <input
        type="text"
        id="title"
        name="title"
        v-model="noteData.title"
        class="mt-1 mb-5 placeholder:text-sm focus:border-input"
        placeholder="Note title"
      />
    </label>
    <label for="content" class="text-base">
      Description
      <textarea
        type="text"
        id="description"
        name="description"
        v-model="noteData.description"
        class="desc mb-5 text-sm placeholder:text-sm mt-1 focus:border-input"
        placeholder="Short description of the note"
      />
    </label>
    <label for="content" class="text-base">
      Content
      <textarea
        type="text"
        id="content"
        name="content"
        v-model="noteData.content"
        class="mt-1 placeholder:text-sm focus:border-input"
        placeholder="Note content"
      />
    </label>

    <button
      type="submit"
      class="inline-flex items-center rounded-lg bg-primary px-14 h-[48px] mt-4 text-sm font-semibold text-slate-50 shadow-sm hover:bg-[#115017] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {{ formType === 'create' ? 'Create' : 'Save' }}
    </button>
  </form>
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
</style>

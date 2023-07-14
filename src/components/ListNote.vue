<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRightIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {useNotesStore} from '@/stores/notes'
const notesStore = useNotesStore()
const {deleteNoteById} = notesStore
const props = defineProps(['note'])

const show = ref(false)
const open = ref(false)

const noteToggle = () => {
  show.value = !show.value
}
</script>

<template>
  <li class="hover:bg-[#ffffff0a] px-4 py-5 sm:px-6">
    <div class="relative flex justify-between gap-x-6">
      <div class="flex gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="text-xl uppercase font-semibold leading-6 text-white">
            <!-- <span class="absolute inset-x-0 -top-px bottom-0" /> -->
            {{ note.title }}
          </p>
          <div class="mt-1 flex text-xs flex-col leading-5 text-white">
            <span class="relative truncate hover:text-primary text-base">{{
              note.description
            }}</span>
            <p class="text-sm leading-5 text-white">Word count: {{ note.wordCount }} words</p>
          </div>
        </div>
      </div>
      <div class="flex items-start gap-x-4">
        <div class="hidden h-full sm:flex sm:flex-col sm:items-end gap-y-4">
          <p class="text-sm leading-6 text-white">{{ note.date }}</p>
          <div class="flex gap-2 items-center">
            <PencilSquareIcon
              class="h-6 w-6 flex-none text-gray-400 hover:text-input"
              aria-hidden="true"
            />
            <TrashIcon
              class="h-6 w-6 flex-none text-red-600 hover:text-red-900"
              aria-hidden="true"
              @click="open = true"
            />
          </div>
        </div>
        <ChevronRightIcon
          class="h-5 w-5 flex-none text-gray-400 hover:text-input"
          @click="noteToggle"
          aria-hidden="true"
        />
      </div>
    </div>
    <Transition>
      <div v-if="show" class="text-white text-lg w-full mt-4 border-t-2 border-gray-600 pt-2">
        {{ note.content }}
      </div>
    </Transition>
  </li>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity blur-xs" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-[#181818] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-[#181818] text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-lg uppercase font-semibold leading-6 text-slate-400"
                    >Delete Note</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-white">
                      Are you sure you want to deactivate your account? All of your data will be
                      permanently removed from our servers forever. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="open = false, deleteNoteById(note.id)"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="open = false"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition: all 0.25s ease-out;
}
</style>

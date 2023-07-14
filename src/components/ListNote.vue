<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['note'])

const show = ref(false)
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
          <div class="mt-1 flex text-xs flex-col leading-5 text-gray-500">
            <span class="relative truncate hover:underline text-base">{{ note.description }}</span>
            <p class="text-sm leading-5 text-gray-500">Word count: {{ note.wordCount }} words</p>
          </div>
        </div>
      </div>
      <div class="flex items-start gap-x-4">
        <div class="hidden h-full sm:flex sm:flex-col sm:items-end gap-y-4">
          <p class="text-sm leading-6 text-white">{{ note.date }}</p>
          <PencilSquareIcon
            class="h-6 w-6 flex-none text-gray-400 hover:text-input"
            aria-hidden="true"
          />
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

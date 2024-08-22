<template>
    <header id="page-header">
        <h1>Vue Notebook</h1>
    </header>

    <main>
        <section id="new-note-button-area">
            <button type="button" class="new-note-button" @click.prevent="newNote">
                <i class="fa-solid fa-plus"></i>
                New
            </button>
        </section>

        <NoteList @editNote="updateNote" />

        <NoteModal @modalClose="showModal = false" v-if="showModal" :color="color" :isEdit="isEdit" :note="note" />
    </main>
</template>

<script lang="ts" setup>
import NoteList from '@/components/NoteList.vue'
import NoteModal from '@/components/NoteModal.vue'
import useData from './composables/useData'
import { onMounted, ref, type Ref } from 'vue'
import type { Note } from './models/note.model'
import useColor from './composables/useColors';
import type { Color } from './models/color.model';


const { getNotes } = useData()
const notes: Ref<Note[]> = ref([])
const note: Ref<Note> = ref({} as any)
const isEdit: Ref<boolean> = ref(false)
const { getColor } = useColor()

const showModal: Ref<boolean> = ref(false)
const color: Ref<Color> = ref({} as any)

onMounted(() => {
    load()
})

const load = () => {
    notes.value = getNotes()?.notes.value || []
}

const newNote = () => {
    const randomColor: Color = getColor()
    color.value = randomColor
    showModal.value = true
}

const updateNote = (value: Note) => {
    note.value = value
    isEdit.value = true
    showModal.value = true
    color.value = note.value.color
}

</script>

<style scoped>
main {
    position: relative;
}

.new-note-button {
    padding: 7px 15px;
}
</style>
<template>
    <section class="modal">
        <div class="modal-body" :style="{ 'background-color': color.bgcolor, 'color': color.fgcolor }">
            <header class="modal-title">
                <input type="text" id="modal-title-input" class="input" placeholder="Enter title" autocomplete="off"
                    v-model="newNote.title">
            </header>
            <textarea name="10" id="modal-body-input" class="input" rows="10" placeholder="Enter description"
                v-model="newNote.description">This is a text</textarea>
            <footer class="modal-buttons">
                <button type="button" id="save" @click="save">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button type="button" @click="$emit('modalClose')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </footer>
        </div>
    </section>
</template>

<script setup lang="ts">
import useData from '@/composables/useData';
import type { Color } from '@/models/color.model';
import type { Note } from '@/models/note.model';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps<{
    color: Color,
    note?: Note,
    isEdit: boolean
}>()

const emit = defineEmits(['modalClose'])

const { addNote, editNote } = useData();

const newNote: Ref<Note> = ref({}) as any

const save = () => {
    if (props.isEdit) {
        editNote(newNote.value)
    } else {
        addNote(newNote.value)
    }
    emit('modalClose')
}

onMounted(() => {
    if (props.note && props.isEdit) {
        newNote.value = { ...props.note }
    }
    if (props.color) {
        newNote.value.color = props.color
    }
})
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: rgba(255, 228, 196, 0.8);
    overflow: auto;
}

.modal-body {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    position: relative;
}

.modal-title {
    text-align: center;
}

.input {
    border: 0;
    padding: 10px;
    font-family: 'Open Sans', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.1rem;
    background: transparent;
}

.input:focus {
    outline: none;
}

.input::placeholder {
    color: #112D4E;
}

#modal-title-input {
    text-align: center;
    font-weight: 600;
    width: 100%;
    text-align: center;
}

#modal-body-input {
    width: 90%;
    margin: 20px;
    resize: none;
}

.modal-buttons {
    padding: 20px;
    margin: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 15px;
}

.modal-buttons button {
    margin-left: 10px;
    border: 0;
    padding: 5px;
    font-family: 'Open Sans', eneva, Verdana, sans-serif;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    background: transparent;
}

.modal-buttons #save {
    border-color: #3F51B5;
}
</style>
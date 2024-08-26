<template>
    <article class="note" :style="{ 'background-color': note.color.bgcolor, 'color': note.color.fgcolor }"
        @mouseenter="showRemoveIcon" @mouseleave="showRemoveIcon">
        <div class="icons" :class="{ 'show': showIcon }">
            <i class="fa-solid fa-palette" title="Change color" @click="showColors"></i>
            <i class="fa-solid fa-edit" title="Edit" @click="$emit('editNote', note)"></i>
            <i class="fa-solid fa-trash-alt" title="Delete" @click="remove"></i>
        </div>
        <header class="note-header" @click="$emit('editNote', note)">
            <h3>{{ note.title?.length > 40 ? note.title.substring(0, 40) + ' ...' : note.title }}</h3>
        </header>
        <div class="note-body" @click="$emit('editNote', note)">
            <p>
                {{ note.description?.length > 150 ? note.description?.substring(0, 150) + ' ...' : note.description }}
            </p>
        </div>
    </article>
</template>

<script lang="ts" setup>
import useData from '@/composables/useData';
import type { Color } from '@/models/color.model';
import type { Note } from '@/models/note.model'
import { ref } from 'vue'

const props = defineProps<{ note: Note, newColor?: Color }>()
const emit = defineEmits(['showColorPalette', 'editNote'])

const showIcon = ref(false)
const { removeNote } = useData();

const showRemoveIcon = () => {
    showIcon.value = !showIcon.value
}

const showColors = () => {
    emit('showColorPalette', props.note.id)
}

const remove = () => {
    const result = confirm('Are you sure you want to delete this note?')
    if (result) {
        removeNote(props.note.id)
    }
}
</script>

<style scoped>
.note {
    padding: 10px;
    margin: 25px;
    width: 220px;
    height: 220px;
    box-shadow: 0 2px 2px 0 #3F72AF;
    position: relative;
}

.note-header,
.note-body {
    cursor: pointer;
}

.note-header {
    margin: 20px 0 10px 0;
}

.note-body p {
    /* height: 78px; */
    overflow: hidden;
}

.icons {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    cursor: pointer;
}

.icons i {
    margin-right: 10px;
}

.show {
    display: block !important;
}
</style>
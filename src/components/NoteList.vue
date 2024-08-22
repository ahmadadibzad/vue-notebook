<template>
    <section id="notes">
        <SingleNote v-for="note in store" :key="note.id" :note="note" @showColorPalette="showCollerPallete"
            @editNote="editNote" />
    </section>

    <ColorPalette v-if="isColorPaletteVisible" :colors="colors" @colorSelected="selectColor"
        @closePalette="isColorPaletteVisible = false" />
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue';
import ColorPalette from './ColorPalette.vue';
import SingleNote from './SingleNote.vue'
import useData from '@/composables/useData'
import useColor from '@/composables/useColors';
import type { Color } from '@/models/color.model';
import type { Note } from '@/models/note.model';

const { store, changeColor } = useData()
const { getColors } = useColor()

const isColorPaletteVisible: Ref<boolean> = ref(false)
const colors: Ref<Color[]> = ref([])
const noteId: Ref<number> = ref(0)

const emit = defineEmits(['editNote'])

const showCollerPallete = (id: number) => {
    noteId.value = id
    isColorPaletteVisible.value = true
}

const selectColor = async (selectedColor: { bg: string, fg: string }) => {
    isColorPaletteVisible.value = false
    changeColor(noteId.value, { bgcolor: selectedColor.bg, fgcolor: selectedColor.fg })
}

const editNote = (value: Note) => {
    emit('editNote', value)
}

watch(() => isColorPaletteVisible.value, () => {
    if (isColorPaletteVisible.value === false) {
        return
    }

    if (colors.value.length === 0) {
        colors.value = getColors()
    }
})
</script>

<style scoped>
#notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px auto;
}
</style>
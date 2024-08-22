import type { Color } from "@/models/color.model"
import type { Note } from "@/models/note.model"
import { ref, type Ref } from "vue"

const store: Ref<Note[]> = ref([])

export default function useData() {
    const getNotes = () => {
        const notes: Ref<Note[]> = ref([])
        const error: Ref<{
            hasError: boolean, errorMessage: string | null
        }> = ref({ hasError: false, errorMessage: null })

        try {
            const json: string | null = localStorage.getItem('NoteBookApp_Vue') || ''
            if (!json) {
                return
            }

            const parsedData: { notes: Note[] } = JSON.parse(json)
            if (parsedData.notes.length > 0) {
                notes.value = parsedData.notes
                store.value = [...notes.value]
            }

        } catch (err: any) {
            error.value = {
                hasError: true,
                errorMessage: err
            }
        }

        return { notes, error }
    }

    const getLastNoteId = (): number => {
        const json: string | null = localStorage.getItem('NoteBookApp_Vue') || ''
        if (!json) {
            return 0
        }

        const parsedData: { notes: Note[] } = JSON.parse(json)
        if (parsedData.notes.length > 0) {
            return parsedData.notes[parsedData.notes.length - 1].id;
        } else {
            return 0;
        }
    }

    const addNote = (note: Note) => {
        let lastNoteId: number = getLastNoteId()
        note.id = ++lastNoteId
        store.value.push(note)
        localStorage.setItem('NoteBookApp_Vue', JSON.stringify({ notes: store.value }))
    }

    const editNote = (note: Note) => {
        store.value[store.value.findIndex(n => n.id === note.id)] = note
        localStorage.setItem('NoteBookApp_Vue', JSON.stringify({ notes: store.value }))
    }

    const removeNote = (id: number) => {
        const note = store.value.find(n => n.id === id);
        if (!note) {
            return
        }
        store.value.splice(store.value.indexOf(note), 1)
        localStorage.setItem('NoteBookApp_Vue', JSON.stringify({ notes: store.value }))

    }

    const changeColor = (id: number, newColor: Color) => {
        store.value[store.value.findIndex(n => n.id === id)].color = newColor
        localStorage.setItem('NoteBookApp_Vue', JSON.stringify({ notes: store.value }))
    }

    return { store, getNotes, addNote, editNote, removeNote, changeColor }
}
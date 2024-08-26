import type { Color } from "@/models/color.model";

export default function useColor() {
    const colors: Color[] = [
        /* Red */
        { bgcolor: '#FF7043', fgcolor: '#FFF' },
        { bgcolor: '#EF5350', fgcolor: '#FFF' },
        { bgcolor: '#EC407A', fgcolor: '#FFF' },

        /* Purple */
        { bgcolor: '#AB47BC', fgcolor: '#FFF' },
        { bgcolor: '#7E57C2', fgcolor: '#FFF' },
        { bgcolor: '#5C6BC0', fgcolor: '#FFF' },

        /* Blue */
        { bgcolor: '#42A5F5', fgcolor: '#112D4E' },
        { bgcolor: '#29B6F6', fgcolor: '#112D4E' },
        { bgcolor: '#26C6DA', fgcolor: '#112D4E' },

        /* Green */
        { bgcolor: '#26A69A', fgcolor: '#112D4E' },
        { bgcolor: '#66BB6A', fgcolor: '#112D4E' },
        { bgcolor: '#9CCC65', fgcolor: '#112D4E' },
        { bgcolor: '#D4E157', fgcolor: '#112D4E' },

        /* Yellow */
        { bgcolor: '#FFEE58', fgcolor: '#112D4E' },
        { bgcolor: '#FFCA28', fgcolor: '#112D4E' },
        { bgcolor: '#FFA726', fgcolor: '#112D4E' },

        /* Cold */
        { bgcolor: '#8D6E63', fgcolor: '#FFF' },
        { bgcolor: '#BDBDBD', fgcolor: '#717171' },
        { bgcolor: '#78909C', fgcolor: '#112D4E' },
    ]

    const pickColor = (): Color => {
        const min = 1;
        const max = 19;

        const random: number = Math.random() * (max - min) + min;
        const color: Color = colors[Math.round(random)]
        if (!color) {
            console.log('not');

            return pickColor()
        } else {
            return color
        }
    }

    const getColor = (): Color => {
        return pickColor()
    }

    const getColors = (): Color[] => {
        return colors
    }

    return { getColor, getColors }
}
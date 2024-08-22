import type { Color } from "@/models/color.model";

export default function useColor() {
    const colors: Color[] = [
        /* Red */
        { bgcolor: '#FF7043', fgcolor: '#C12E00' },
        { bgcolor: '#EF5350', fgcolor: '#FAC6C5' },
        { bgcolor: '#EC407A', fgcolor: '#F7ADC6' },

        /* Purple */
        { bgcolor: '#AB47BC', fgcolor: '#FFF' },
        { bgcolor: '#7E57C2', fgcolor: '#BDA9E0' },
        { bgcolor: '#5C6BC0', fgcolor: '#AEB5E0' },

        /* Blue */
        { bgcolor: '#42A5F5', fgcolor: '#0966B1' },
        { bgcolor: '#29B6F6', fgcolor: '#0774A5' },
        { bgcolor: '#26C6DA', fgcolor: '#167783' },

        /* Green */
        { bgcolor: '#26A69A', fgcolor: '#17645C' },
        { bgcolor: '#66BB6A', fgcolor: '#357838' },
        { bgcolor: '#9CCC65', fgcolor: '#5F892E' },
        { bgcolor: '#D4E157', fgcolor: '#939F1C' },

        /* Yellow */
        { bgcolor: '#FFEE58', fgcolor: '#CEB900' },
        { bgcolor: '#FFCA28', fgcolor: '#B18500' },
        { bgcolor: '#FFA726', fgcolor: '#B06900' },

        /* Cold */
        { bgcolor: '#8D6E63', fgcolor: '#FFF' },
        { bgcolor: '#BDBDBD', fgcolor: '#717171' },
        { bgcolor: '#78909C', fgcolor: '#465760' },
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
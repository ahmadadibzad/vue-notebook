import type { Color } from "./color.model";

export interface Note {
    id: number;
    title: string;
    description?: string;
    color: Color
}
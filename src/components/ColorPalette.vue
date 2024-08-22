<template>
    <section class="palette">
        <div class="palette-body">
            <div class="icons">
                <i class="fa-solid fa-times" @click="$emit('closePalette')"></i>
            </div>
            <ul v-for="color in colors" :key="color.bgcolor">
                <li @click="$emit('colorSelected', { bg: color.bgcolor, fg: color.fgcolor })">
                    <div class="color" :style="{ 'background-color': color.bgcolor }"></div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Color } from '@/models/color.model';

defineProps<{ colors: Color[] }>()
</script>

<style scoped>
.palette {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: rgba(255, 228, 196, 0.8);
    overflow: auto;
}

.palette-body {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    position: relative;
}

.palette-body ul {
    display: inline-flex;
}

.palette-body ul li {
    cursor: pointer;
    position: relative;
}

.icons {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.color {
    width: 30px;
    height: 30px;
    border-radius: 1px;
    margin: 10px;
}
</style>
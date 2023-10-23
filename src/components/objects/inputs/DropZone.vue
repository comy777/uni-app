<template>
    <div class="filedrop-wrapper">
        <!-- file drop zone -->
        <div
            class="filedrop-box"
            :class="{ 'filedrop-box-dragover': isDragover }"
            @drop.prevent="dropHandler($event)"
            @dragover.prevent="setIsDragOver(true)"
            @dragleave.prevent="setIsDragOver(false)"
        >
            <p class="text-xl" :class="[isDragover ? 'block dragover-borders' : 'hidden']">
                Drag and Drop Files Here
            </p>
        </div>
        <!-- displaying files to user -->
        <div v-for="(f, i) in allFiles" class="file-box" :key="i">
            <div>{{ f.name }}</div>
            <div class="action-btn" @click="deleteFile(f)">
                <div class="action-icon text-red-500">X</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const allFiles = ref<File[]>([]);
        const isDragover = ref(false);

        function deleteFile(file: File) {
            console.log('triggered deleteFile')
            allFiles.value = allFiles.value.filter((f: File) => f !== file);
        }

        const dropHandler = (event: any) => {
            console.log('triggered setIsDragOver')
            const droppedFiles: FileList = event.dataTransfer.files;
            const droppedFilesArray: File[] = Array.from(droppedFiles)

            droppedFilesArray.forEach((f: any) => {
                allFiles.value.push(f);
            });
            isDragover.value = false;
        };

        const setIsDragOver = (isDragoverBool: boolean) => {
            console.log('triggered setIsDragOver')
            isDragover.value = isDragoverBool;
        };

        return {
            deleteFile,
            dropHandler,
            setIsDragOver,
            isDragover,
            allFiles,
        };
    },
});
</script>

<style scoped>
.filedrop-wrapper {
    @apply w-1/4;
    @apply h-auto;
    @apply border;
    @apply py-5;
    @apply border-black;
    @apply bg-gray-100;
    @apply flex;
    @apply items-center;
    @apply flex-col;
}
.filedrop-box {
    @apply border-dashed;
    @apply border-2;
    @apply border-gray-500;
    @apply rounded-sm;
    @apply bg-gray-200;
    @apply transition-all;
    @apply duration-500;
    @apply w-10/12;
    @apply h-64;
    @apply flex;
    @apply justify-center;
    @apply items-center;
}
.filedrop-box-dragover {
    @apply bg-gray-400;
    @apply border-gray-700;
}
.file-box {
    @apply w-10/12;
    @apply px-5;
    @apply py-1;
    @apply my-1;
    @apply flex;
    @apply justify-between;
    @apply border;
    @apply border-gray-500;
    @apply rounded-lg;
}
.action-btn {
    @apply h-8;
    @apply w-8;
    @apply rounded-sm;
    @apply flex;
    @apply items-center;
    @apply justify-center;
    @apply cursor-pointer;
}
.action-icon {
    @apply h-4;
    @apply w-4;
}

.dragover-borders {
    @apply py-2;
    @apply border-2;
    @apply border-green-500;
}
</style>
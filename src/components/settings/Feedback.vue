<template>
    <div class="m-2" id="feedback">
        <Loader v-if="loading"></Loader>
        <div>
            <h2 class="text-4xl font-semibold">Feedback</h2>
        </div>
        <div class="pt-4 flex flex-col">
            <form class="flex flex-col" v-on:submit.prevent="save">
                <input v-model="title" type="text" placeholder="Title"
                    class="outline-none border-2 border-gray-200 p-3 rounded-lg w-60 my-2">
                <textarea v-model="details" placeholder="Description"
                    class="outline-none border-2 border-gray-200 p-3 rounded-lg w-60"> </textarea>
                <div class="py-4">
                    <button class="bg-vino flex w-14 p-2 text-white rounded-md font-semibold">SAVE</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Loader from "../../components/objects/Loader.vue";
import { getFeedback, saveOrUpdateFeedback } from '../../controllers/feedback';
import { Feedback } from '../../models/feedback';
import { showNotification } from "../../services/notifications";

export default defineComponent({
    components: {
        Loader,
    },
    setup() {
        const loading = ref(false);
        const userId: string = localStorage.getItem("user_id");
        const title = ref(null);
        const details = ref(null);
        const feedbackId = ref(null);

        const setData = (feedback: Feedback) => {
            console.log(feedback);
            title.value = feedback?.title ? feedback.title : null;
            details.value = feedback?.details ? feedback.details : null;
            feedbackId.value = feedback?.id ? feedback.id : null;
        }

        const save = () => {
            loading.value = true;
            saveOrUpdateFeedback({
                id: feedbackId.value,
                title: title.value,
                details: details.value,
                user_id: userId
            })
                .then(async (res) => {
                    showNotification({
                        type: "success",
                        text: "save feedback information success full",
                        title: "save"
                    })
                    setData(await getFeedback(userId));
                    loading.value = false;
                })
                .catch((e) => {
                    console.log(e)
                    showNotification({
                        type: "error",
                        text: "error save feedback information",
                        title: "error"
                    })
                    loading.value = false;
                });
        }

        onMounted(async () => {
            setData(await getFeedback(userId));
        });

        return {
            loading,
            userId,
            title,
            details,
            save
        }
    }



});
</script>
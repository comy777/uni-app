<template>
    <div class="m-2">
        <Loader v-if="loading"></Loader>
        <div>
            <h2 class="text-4xl font-semibold">Password</h2>
        </div>
        <div class="pt-4 flex flex-col">
            <!--<input type="password" placeholder="Current Password" class="outline-none border-2 border-gray-200 p-3 rounded-lg w-60">
            <span class="text-vino p-2">Forgot Password?</span>-->
            <input v-model="password" type="password" placeholder="New Password"
                class="outline-none border-2 border-gray-200 p-3 rounded-lg w-60" />
            <div class="p-2 text-lg">
                <p>You password must be</p>
                <div class="pl-2">
                    <p>• At least 8 characters</p>
                    <p>• Use both lower and uppercase letters</p>
                    <p>• Include at least one special character e.q. !@#?</p>
                </div>
            </div>
            <input v-model="passwordConfirm" type="password" placeholder="Confirm Password"
                class="outline-none border-2 border-gray-200 p-3 rounded-lg w-60" />
            <div class="py-4">
                <button @click="changePassword"
                    class="bg-vino flex w-14 p-2 text-white rounded-md font-semibold">SAVE</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';
import { showNotification } from "../../services/notifications";
import Loader from "../objects/Loader.vue";
const client_id = import.meta.env.PULSE_AUTH0_CLIENT_ID
const client_secret = import.meta.env.PULSE_CLIENT_SECRET_PASSWORD
const audience = import.meta.env.PULSE_AUDIENCE_PASSWORD
const grant_type = import.meta.env.PULSE_GRANT_TYPE_PASSWORD
const domain_token = import.meta.env.PULSE_DOMAIN_AUTH0


export default defineComponent({
    components: {
        Loader,
    },
    setup() {
        const { user } = useAuth0();
        const auth0_user_id = user.value.sub;
        const password = ref("");
        const passwordConfirm = ref("");
        let token: any = null;
        const loading = ref<boolean>(false);

        async function changePassword() {
            loading.value = true;
            if ((password.value.length > 7) && (password.value === passwordConfirm.value)) {
                token = await getAccessToken();
                const response = await fetch(`${audience}users/${auth0_user_id}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "password": password.value,
                        "connection": "Username-Password-Authentication"
                    })

                });
                const data = await response.json();
                if (data.statusCode) {
                    showNotification({
                        type: "success",
                        text: data.message,
                        title: data.error
                    })
                } else {
                    showNotification({
                        type: "success",
                        text: "password change successfull",
                        title: "change"
                    })
                }
            } else {
                showNotification({
                    type: "success",
                    text: "the password does not meet the conditions",
                    title: "error"
                })
            }
            
            loading.value = false;
            password.value = null;
            passwordConfirm.value = null;
        }


        const getAccessToken = async () => {
            if (!token) {
                const url = `https://${domain_token}/oauth/token`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        client_id,
                        client_secret,
                        audience,
                        grant_type
                    })

                });
                const data = await response.json();
                return data?.access_token;
            }
        }

        return {
            changePassword,
            password,
            passwordConfirm,
            loading
        };

    }
})
</script>
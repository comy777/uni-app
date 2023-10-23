<template>
    <Loader v-if="loading"></Loader>
    <div class="my-2 ml-1 sm:pr-10 md:pr-0 md:w-11/12 sm:w-full md:px-10">
        <div class="">
            <h2 class="md:text-3xl sm:text-2xl sm:ml-2">Account Information</h2>
            <div class="flex p-2 pt-8 overflow-hidden">
                <form class="md:flex md:flex-col w-full" v-on:submit.prevent="save">
                    <div class="grid md:grid-cols-2 md:gap-10">
                        <div class="field-disabled">
                                <input class="
                                sm:mb-2 sm:w-full
                                outline-none
                                border-2 border-gray-200
                                p-3
                                rounded-lg
                                w-60
                                md:mr-2
                            " type="text" required autocomplete="off" id="username" v-model="epicID" disabled>
                                <label for="epic" title="Epic ID" data-title="Epic ID"></label>
                            
                        </div>
                        <div class="field-disabled">
                            <input
                                v-model="role"
                                type="text"
                                placeholder="Role"
                                class="
                                    sm:mb-2 sm:w-full
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-60
                                "
                                disabled
                            />
                            <label for="role" title="Role" data-title="Role"></label>
                        </div>   
                       
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-10">
                       
                        <div class="field">
                            <input
                            v-model="firstName"
                            type="text"
                            placeholder="First Name"
                            class="
                                sm:mb-2 sm:w-full
                                outline-none
                                border-2 border-gray-200
                                p-3
                                rounded-lg
                                w-60
                                md:mr-2
                            "
                        />

                        <label for="firstName" title="First Name" data-title="First Name"></label>
                        </div>
                       <div class="field">
                        <input
                            v-model="lastName"
                            type="text"
                            placeholder="Last Name"
                            class="
                                sm:mb-2 sm:w-full
                                outline-none
                                border-2 border-gray-200
                                p-3
                                rounded-lg
                                w-60
                            "
                        />
                        <label for="lastName" title="Last Name" data-title="Last Name"></label>
                       </div>
                        
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-10">
                        <div class="md:flex sm:grid w-[100%]">
                            <div class="field">
                                    <select
                                        v-model="indicator"
                                        class="
                                            border
                                            block
                                            pl-3
                                            py-2
                                            text-base
                                            border-gray-300
                                            focus:outline-none
                                            focus:ring-indigo-500
                                            focus:border-indigo-500
                                            sm:text-sm
                                            rounded-md
                                            h-11
                                            mr-2
                                            md:w-[105px]
                                            sm:w-full
                                            
                                        "
                                >
                                        <option value="+1" selected>USA +1</option>
                                        <option
                                            v-for="(phone, i) in phones"
                                            :value="phone.phone_code"
                                            :key="i"
                                        >
                                            {{ phone.iso3 }} {{ phone.phone_code }}
                                        </option>
                                    </select>
                                    <label for="indicator" title="Indicator" data-title="Indicator"></label>
                                 </div>
                                <div class="field w-full">
                                    <input
                                        v-model="contactNumber"
                                        type="text"
                                        placeholder="Mobile Phone Number"
                                        class="
                                            sm:mb-2 sm:w-full
                                            outline-none
                                            border-2 border-gray-200
                                            p-3
                                            rounded-lg
                                            md:w-full
                                            
                                        "
                                        :autofocus="inputPhoneNumber"
                                    />
                                    <label for="contactNumber" title="Mobile Phone" data-title="Mobile Phone "></label>
                                </div>
                            
                             </div>
                    <div class="field w-full ">
                    <!-- <div class="field md:w-10/12 md:ml-6">  -->
                        <input
                            v-model="officeNumber"
                            type="text"
                            placeholder="Office Phone Number"
                            class="
                                sm:mb-2 sm:w-full
                                outline-none
                                border-2 border-gray-200
                                p-3
                                rounded-lg
                                
                                
                            "
                        />
                        <label for="officeNumber" title="Office Phone " data-title="Office Phone "></label>
                    </div>
                </div>
                    <div class="grid md:grid-cols-2 md:gap-10">
                      <div class="field-disabled">
                        <input
                                v-model="email"
                                type="text"
                                placeholder="Email"
                                class="
                                    sm:mb-2 sm:w-full
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-60
                                    md:mr-2
                                "
                                disabled
                            />
                            <label for="email" title="Email" data-title="Email"></label>
                     
                      </div>
                            
                       
                         <div class="field">
                            <select
                                v-model="speciality"
                                class="
                                    sm:mb-2 sm:text-sm
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-full
                                    md:mr-2
                                    h-11
                                "
                            >
                                <option disabled selected value="0">Please select a specialty</option>
                                <option
                                    v-for="specialtyObj in specialties"
                                    :value="specialtyObj.id"
                                    :key="specialtyObj.id"
                                >
                                    {{ specialtyObj.name }}
                                </option>
                            </select>
                            <label for="speciality" title="Speciality" data-title="Speciality"></label>

                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-10">
                        <div class="field">
                            <input
                                v-model="workEmail"
                                type="text"
                                placeholder="Work Email"
                                class="
                                    sm:mb-2 sm:w-full
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-60
                                    mr-2
                                "
                            />
                            <label for="workEmail" title="Work Email" data-title="Work Email"></label>

                         </div>   
                         <div class="field">
                            <input
                                v-model="jobTitle"
                                type="text"
                                placeholder="Job title"
                                class="
                                    sm:mb-2 sm:w-full
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    
                                "
                            />
                            <label for="jobTitle" title="Job title" data-title="Job title"></label>

                         </div>   
                    </div>
                    
                    <div class="flex sm:grid mb-10">
                        <SelectMultiple 
                            width="w-full"
                            height="h-[10vh]" 
                            placeholder="Please select Departments" 
                            class="mt-2"
                            :options="departments.map((department: any) => {
                                return {
                                    label: department.name,
                                    value: department.id,
                                }})"
                            :vModelGetter="getter" 
                            :vModelSetter="setter"
                        />

                    </div>
                    <div class="grid md:grid-cols-2 md:gap-10">
                        <div class="flex sm:grid field">
                            <select
                                v-model="primaryLocation"
                                class="
                                    flex
                                    sm:mb-2 sm:text-sm
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-full
                                    md:mr-2
                                    h-11
                                "
                            >
                                <option disabled selected value="0">
                                    Please select a first location
                                </option>
                                <option
                                    v-for="location in locations"
                                    :value="location.id"
                                    :key="location.id"
                                >
                                    {{ location.name }}
                                </option>
                            </select>
                            <label for="primaryLocation" title="First location" data-title="First Location"></label>
                        </div>
                        <div class="flex sm:grid field">
                            <select
                                v-model="secondaryLocation"
                                class="
                                sm:mb-2 sm:text-sm
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-full
                                    md:mr-2
                                    h-11
                                "
                            >
                                <option disabled selected value="0">
                                    Please select a second location
                                </option>
                                <option
                                    v-for="location in locations"
                                    :value="location.id"
                                    :key="location.id"
                                >
                                    {{ location.name }}
                                </option>
                            </select>
                            <label for="secondaryLocation" title="Second location" data-title="Second location"></label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-10">
                        <div class="flex sm:grid field">
                            <select
                                v-model="thirdLocation"
                                class="
                                sm:mb-2 sm:text-sm
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-full
                                    md:mr-2
                                    h-11
                                "
                            >
                                <option disabled selected value="0">
                                    Please select a third location
                                </option>
                                <option
                                    v-for="location in locations"
                                    :value="location.id"
                                    :key="location.id"
                                >
                                    {{ location.name }}
                                </option>
                            </select>
                            <label   for="thirdLocation" title="Third location" data-title="Third location"></label>
                        </div>
                        <div class="flex sm:grid field">
                            <select
                                v-model="fourthLocation"
                                class="
                                    sm:text-sm
                                    outline-none
                                    border-2 border-gray-200
                                    p-3
                                    rounded-lg
                                    w-full
                                    md:mr-2
                                    block
                                    h-11
                                "
                            >
                                <option disabled selected value="0">
                                    Please select a fourth location
                                </option>
                                <option
                                    v-for="location in locations"
                                    :value="location.id"
                                    :key="location.id"
                                >
                                    {{ location.name }}
                                </option>
                            </select>
                            <label   for="fourthLocation" title="Fourth location" data-title="Fourth location"></label>
                        </div>                
                    </div> 
                             
                    <div class="py-4">
                        <button class="bg-vino flex p-2 text-white rounded-3xl w-20 justify-center">
                            SAVE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { getProfileSettings, saveProfileSettings } from '../../controllers/profiles';
import { listSpecialties } from '../../controllers/specialty';
import { listLocations } from '../../controllers/locations';
import { ProfileSetting } from '../../models/profiles';
import { showNotification } from '../../services/notifications';
import Loader from '../../components/objects/Loader.vue';
import { useRoute } from 'vue-router';
import { getListDepartments } from '../../controllers/report';
import { phoneIndicators } from '../../utils/phoneNumbers'
import { useStore } from 'vuex';
import SelectMultiple from "../../components/objects/selects/SelectMultiple.vue";
export default defineComponent({
    components: {
        Loader,
        SelectMultiple
    },
    setup() {
        const userId: string = localStorage.getItem('user_id');
        const contactNumber = ref(null);
        const officeNumber = ref(null);
        const email = ref(null);
        const speciality = ref(null);
        const workEmail = ref(null);
        const jobTitle = ref(null);
        const primaryLocation = ref(null);
        const secondaryLocation = ref(null);
        const thirdLocation = ref(null);
        const fourthLocation = ref(null);
        const specialties = ref([]);
        const locations = ref([]);
        const loading = ref(true);
        const firstName = ref(null);
        const lastName = ref(null);
        const epicID = ref(null);
        const role = ref(null);
        const route = useRoute();
        const inputPhoneNumber = ref(false);
        const idReportDepartment = ref(null);
        const departments = ref([]);
        const indicator = ref('+1')
        const phones = ref(phoneIndicators)
        const invalidPhoneNumber = ref(false)
        const store = useStore()

        function setData(profile: ProfileSetting) {
            const { contact_number } = profile
            let phoneNumber = ''
            indicator.value = '+1'
            if(contact_number){
                const contactNumberSplit = contact_number.split(" ") ?? [];
                if(contactNumberSplit.length){
                    const indicatorValue = contactNumberSplit[0]
                    let validate = false
                    if(indicatorValue){
                        const data = phoneIndicators.find((value) => value.phone_code === indicatorValue)
                        if(data) validate = true
                    }
                    indicator.value = validate ? indicatorValue : '+1'
                    phoneNumber = contactNumberSplit[contactNumberSplit.length - 1]
                    if(phoneNumber.includes("+")) invalidPhoneNumber.value = true
                }
            }
            contactNumber.value = phoneNumber;
            officeNumber.value = profile.office_number;
            email.value = profile.email;
            speciality.value = profile.specialty ? profile.specialty.id : 0;
            workEmail.value = profile.work_email;
            jobTitle.value = profile.job_title;
            primaryLocation.value = profile.location_primary ? profile.location_primary.id : 0;
            secondaryLocation.value = profile.location_secondary ? profile.location_secondary.id : 0;
            thirdLocation.value = profile.location_third ? profile.location_third.id : 0;
            fourthLocation.value = profile.location_fourth ? profile.location_fourth.id : 0;
            firstName.value = profile.first_name;
            lastName.value = profile.last_name;
            epicID.value = profile.employee_id;
            role.value = profile.role.role_name;
            //assigned departments 
            if(profile.profile_departments?.length && selectedDepartments.value.length < 1){
                let departmentsUser: Array<any> = [];
                profile.profile_departments.forEach((department: any) => {
                    departmentsUser.push(department.id_department)
                })
                 store.commit('user/updateSelectedDepartments', departmentsUser)
            }
        }

        function save() {            
            loading.value = true;
            let phone = ''
            if(contactNumber.value){
                if(!contactNumber.value.includes("+")) phone = `${indicator.value} ${contactNumber.value}`
            }
            saveProfileSettings({
                id: userId,
                contact_number: phone,
                office_number: officeNumber.value,
                email: email.value,
                specialty: speciality.value === 0 ? null : speciality.value,
                work_email: workEmail.value,
                job_title: jobTitle.value,
                primary_location: primaryLocation.value === 0 ? null : primaryLocation.value,
                secondary_location: secondaryLocation.value === 0 ? null : secondaryLocation.value,
                third_location:thirdLocation.value === 0 ? null : thirdLocation.value,
                fourth_location:fourthLocation.value === 0 ? null : fourthLocation.value,
                first_name: firstName.value,
                last_name: lastName.value,
                departments: selectedDepartments.value
            })
                .then(async (res) => {
                    showNotification(
                        {
                            type: 'success',
                            text: 'save account information success full',
                            title: 'save',
                        },
                        4000,
                        1,
                    );
                    clearData();
                    setData(await getProfileSettings(userId, true));
                    loading.value = false;
                })
                .catch((e) => {
                    console.log(e);
                    showNotification(
                        {
                            type: 'error',
                            text: 'error saved account information',
                            title: 'error',
                        },
                        4000,
                        2,
                    );
                    loading.value = false;
                });
        }

        function clearData() {
            contactNumber.value = null;
            officeNumber.value = null;
            email.value = null;
            speciality.value = null;
            workEmail.value = null;
            jobTitle.value = null;
            primaryLocation.value = null;
            secondaryLocation.value = null;
            thirdLocation.value = null;
            fourthLocation.value = null;
            firstName.value = null;
            lastName.value = null;
            idReportDepartment.value = null;
        }

        const getter = () => {
            return store.state.user.selectedDepartments;
        }

        const setter = (value: any) => {
            return store.commit('user/updateSelectedDepartments', value);
        }

        const selectedDepartments = computed(() => {
            return store.state.user.selectedDepartments;
        });

        onMounted(async () => {
            setData(await getProfileSettings(userId, true));
            specialties.value = await listSpecialties();
            locations.value = await listLocations();
            departments.value = await getListDepartments();
            const valueRoute = route.params;
            if (valueRoute.value === 'true') inputPhoneNumber.value = true;
            loading.value = false;
            if(invalidPhoneNumber.value){
                alert("Enter number without country code")
                inputPhoneNumber.value = true
            }
        });

        return {
            contactNumber,
            officeNumber,
            email,
            speciality,
            workEmail,
            jobTitle,
            primaryLocation,
            secondaryLocation,
            thirdLocation,
            fourthLocation,
            locations,
            specialties,
            save,
            loading,
            firstName,
            lastName,
            epicID,
            role,
            inputPhoneNumber,
            departments,
            idReportDepartment,
            indicator,
            phones,
            getter,
            setter
        };
    },
});
</script>
<style>
/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.field,
.field-disabled {
    position: relative;
    margin-bottom: 15px;
}

.field select {
    background: #fff;
}

.field label::before,
.field-disabled label::before {
    content: attr(title);
    position: absolute;
    top: 0;
    left: 15px;
    line-height: 40px;
    font-size: 14px;
    color: #000000;
    transition: 300ms all;
}

.field input,
.field select,
.field-disabled input {
    line-height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
    color: #222;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.field input:focus,
.field-disabled input:focus,
.field select:focus  {
    outline: 0;
    border-color: #000;
}

.field input:valid + label::before,
.field select:valid + label::before,
.field-disabled input:valid + label::before {
    line-height: 20px;
    font-size: 12px;
    top: -10px;
    background: #fff;
    padding: 0 6px;
    left: 9px;
    content: attr(data-title);
}

.field input:focus + label::before,
.field select:focus + label::before,
.field-disabled input+label::before {
    line-height: 20px;
    font-size: 12px;
    top: -10px;
    background: #fff;
    padding: 0 6px;
    left: 9px;
    content: attr(data-title);
    color: #000;
}

.arrow-select {
    background: url('/assets/svg/arrow-down.svg') no-repeat 100% 50%;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-position-x: 98%;
}

/*.el-select.mt-2.w-full.z-20 {
        margin-top: 0;
    }
    .el-input.el-input--suffix {
        display: block;
        padding-top: 1.25rem !important;
        padding-bottom: 0.25rem !important;
        padding-left: 0.625rem !important;
        padding-right: 0.625rem !important;
        border-width: 1px !important;
        border-top-left-radius: 0.5rem !important;
        border-top-right-radius: 0.5rem !important;
        appearance: none;
    }

    .el-input.el-input--suffix .el-input__wrapper {
        position: fixed;
    }*/
</style>
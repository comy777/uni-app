<template>
    <div class="flex flex-col overflow-auto md:h-[65vh] w-[100%] 2xl:h-[75vh]" id="containerTable">
        <div class="sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:pl-8 lg:pr-0" 
                :class="headerTableFixed && 'table-wrp block max-h-96'">
                <table class="min-w-full">
                    <thead class="border-b" @click="handleShowMenu()">
                        <tr>
                            <th v-for="thead in theads" :key="thead" scope="col"
                            class=" md:py-2 md:px-3 sm:px-4 w-12 text-left sticky top-0 z-10 bg-white shadow-custom">
                                <div class="flex items-center gap-2">
                                    <div>
                                        <div v-if="thead.iconAttachment || thead.iconDotsVerticalIcon || thead.checkAll">
                                            <Attachment v-if="thead.iconAttachment" />
                                            <DotsVerticalIcon v-if="thead.iconDotsVerticalIcon" class="w-7 h-5"/>
                                            <div class="flex flex-row gap-1 mt-2" v-if="thead.checkAll && checkAllShow(status) && timeEntriesAdmin">
                                                <input 
                                                v-model="selectAll" 
                                                type="checkbox" 
                                                class="border-gray-300 rounded h-4 w-4 ml-[2px] cursor-pointer" />
                                                <label class="text-sm font-custom">All</label>
                                            </div> 
                                            
                                        </div>
                                        <div v-else>
                                            <label  class="text-sm font-custom">{{ thead.name }}</label>
                                        </div>
                                    </div>
                                    <div v-if="thead.sort" @click="sortTableBy(thead.name)" class="relative cursor-pointer">
                                        <ArrowUpDown class="opacity-50" />
                                        <div v-if="(filterTheads.thead === thead.name && !filterTheads.orderBy)" class="absolute bottom-5 left-0 w-[0.38rem] h-[0.38rem] rounded-full bg-[#701048]"></div>
                                        <div v-if="(filterTheads.thead === thead.name && filterTheads.orderBy)" class="absolute top-5 bottom-0 right-0 w-[0.38rem] h-[0.38rem] rounded-full bg-[#701048]"></div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody :class="headerTableFixed">
                        <tr v-for="timeEntry, index in timeEntries" :key="index" 
                            :class="['border-b', (index % 2 === 0) ? '' : 'bg-neutral-100']"
                            class="cursor-pointer w-12">
                            <td class="text-base text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap color-830f70 w-20" @click="viewDetails(timeEntry)">
                                #{{ timeEntry.id?.split('-')[0] }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"   @click="viewDetails(timeEntry)">
                                {{ timeEntry.hours_submitted > 0 ? timeEntry.hours_submitted : '-' }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-20"  @click="viewDetails(timeEntry)">
                                {{ dateFormatted(timeEntry?.created_at) }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry?.profile.employee_id }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"  @click="viewDetails(timeEntry)">
                                {{ capitalize(timeEntry?.profile.role?.role_name) }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry.profile.first_name + ' ' + timeEntry?.profile.last_name }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-20"  @click="viewDetails(timeEntry)">
                                {{ dateFormatted(timeEntry.date_submitted) }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry.category.name }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry?.subcategory.name }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry.activity.name }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry.status_time_entry.name }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-20"  @click="viewDetails(timeEntry)">
                                {{ timeEntry.date_approved }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 w-20"  @click="viewDetails(timeEntry)">
                                {{ (timeEntry.hours_approved && timeEntry.hours_approved > 0) ? timeEntry.hours_approved :
                                    '-' }}
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-20"  @click="viewDetails(timeEntry)">
                                <div>{{ (timeEntry.hours_approved && timeEntry.hours_approved > 0) ? timeEntry.rate : '-' }}
                                </div>
                            </td>
                            <td class="text-sm text-gray-900 font-medium md:py-2 md:px-3 sm:px-4 whitespace-nowrap w-10"  @click="viewDetails(timeEntry)">
                                <div
                                    v-if="((timeEntry.hours_approved && timeEntry.hours_approved > 0) || (timeEntry.calculated > 0))">
                                    {{ (timeEntry.hours_approved && timeEntry.hours_approved > 0) ?
                                        setDecimals(timeEntry.hours_approved * timeEntry.rate) : timeEntry.calculated }}</div>
                                <div v-else>-</div>
                            </td>
                            <td class="w-10">
                                <i class="fas fa-paperclip cursor-pointer color-830f70 ml-1">
                                    {{ timeEntry.totalFiles }}
                                </i>
                            </td>
                            <td @click="handleShowMenu(timeEntry.id)" class="cursor-pointer w-10">
                                <DotsVerticalIcon class="w-7 h-6 ml-3" />
                                <MenuProxy
                                    :show-menu="timeEntry.showOptions"
                                    :time-entry="timeEntry"
                                    :time-entries-admin="timeEntriesAdmin"
                                    @handler="handleMenu"
                                />
                            </td>
                            <td v-if="checkAllShow(status) && timeEntriesAdmin" class="md:py-2 md:px-[0.87rem] sm:px-4">
                                <input 
                                    v-model="timeEntry.checked" 
                                    @change="launchSelection('individual', timeEntry.checked)"
                                    type="checkbox" 
                                    class="border-gray-300 rounded h-4 w-4 mt-2 cursor-pointer" 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
.color-701048 {
    color: #701048;
}

.color-830f70 {
    color: #830f70
}

.dropdownfilter {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 9vw;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdownfilter:hover .dropdown-content {
    display: block;
}

.font-custom{
   font-weight: 600;
   opacity: 0.75;
}

.shadow-custom{
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
<script lang="ts">
import { defineComponent, onMounted, ref, PropType, watch, computed } from 'vue';
import { getDateFormatted2, getDateFormattedWithHours } from '../../lib/dates/current-date';
import { MenuItem, MenuItems } from "@headlessui/vue";
import { Menu, MenuButton } from '@headlessui/vue';
import { ChevronDownIcon, LinkIcon, DotsVerticalIcon } from '@heroicons/vue/solid';
import { capitalize } from '../../utils/strings';
import { TimeEntryResponse } from '../../interfaces/response';
import Attachment from "../icons/Attachment.vue";
import ArrowUpDown from "../icons/ArrowUpDown.vue";
import MenuProxy from "../../views/wrvu/MenuProxy.vue";
import { useStore } from 'vuex';

export default defineComponent({
    emits: ['handler', 'selected'],
    props: {
        timeEntries: {
            type: Array as PropType<TimeEntryResponse[]>,
            required: true,
            default: [],
        },
        timeEntriesAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        proxy: {
            type: Boolean,
            default: false
        },
        statusFilter: {
            type: String,
            required: true,
            default: "all"
        }
    },
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        ChevronDownIcon,
        LinkIcon,
        Attachment,
        DotsVerticalIcon,
        ArrowUpDown,
        MenuProxy
    },
    setup(props, { emit }) {
        const store = useStore();
        const theads: Array<any> = [
            { name: 'Proxy', sort: false, accessObject: ''},
            { name: 'Hours', sort: true, accessObject: 'hours_submitted'},
            { name: 'Date Submitted', sort: true, accessObject: 'created_at'},
            { name: 'Epic ID', sort: false, accessObject: ''},
            { name: 'Role', sort: true, accessObject: 'profile.role.role_name'},
            { name: 'Name', sort: true, accessObject: 'profile.first_name'},
            { name: 'Date Ocurred', sort: true, accessObject: 'date_submitted'},
            { name: 'Category', sort: true, accessObject: 'category.name'},
            { name: 'SubCategory', sort: true, accessObject: 'subcategory.name'},
            { name: 'Activity', sort: true, accessObject: 'activity.name'},
            { name: 'Status', sort: true, accessObject: 'status_time_entry.name'},
            { name: 'Date Approved', sort: true, accessObject: 'date_approved'},
            { name: 'Hours Approved', sort: true, accessObject: 'hours_approved'},
            { name: 'Rate', sort: false, accessObject: '' },
            { name: 'Total', sort: false, accessObject: '' },
            { name: 'files', sort: true, iconAttachment: true, accessObject: 'totalFiles'},
            { name: '', sort: false, iconDotsVerticalIcon: true, accessObject: ''},
            { name: '', sort: false, checkAll: true, accessObject: ''}

        ];
        const headerTableFixed = ref(props.proxy);
        const showMenu = ref(false);
        const filterTheads: any = ref({
            thead: null,
            orderBy: true
        });
        const timeEntries = ref<TimeEntryResponse[]>(props.timeEntries);
        const selectAll = ref<Boolean>(false);
        const validateStatus: Array<String> = ["PENDING"];
       
        const status = computed(() => {
            selectAll.value = false;
            return props.statusFilter;
        })

        const statusList = computed(() => {
            return store.state.timeEntries.status;
        });
    
        watch(selectAll, (value: Boolean) => {
            for (const el of timeEntries.value) {
                el.checked = value ? true : false;
            }
            launchSelection("massive", value ? true : false);
        });

        watch(props, () => {
            //validate
            if(filterTheads.value.thead){
                filterTheads.value.orderBy = !filterTheads.value.orderBy;
                sortTableBy(filterTheads.value.thead);
            }
            timeEntries.value = props.timeEntries;
        });

        const dateFormatted = (date: Date | string) => {
            return getDateFormatted2(date);
        };

        const dateFormattedWithHour = (date: Date) => {
            return getDateFormattedWithHours(date);
        };

        const sortTableBy = (column: string = ''): void => {
            //validate
            if(!filterTheads.value.thead){
                filterTheads.value.thead = column;
                filterTheads.value.orderBy = true
            }else if(filterTheads.value.thead === column) {
                filterTheads.value.orderBy = !filterTheads.value.orderBy;
            }else{
                filterTheads.value.thead = column;
                filterTheads.value.orderBy = true;
            }
            
            timeEntries.value.sort((a: any, b: any) => {
                const thead: any | undefined = theads.find((thead) => thead.name === column);
                const theadAccessObject: string | undefined = thead?.accessObject;

                const textA: any = getObjectPropertyValue(a, theadAccessObject);
                const textB: any = getObjectPropertyValue(b, theadAccessObject);

                if (filterTheads.value.orderBy) {
                return compareValues(textA, textB);//asc
                } else {
                return compareValues(textB, textA);//desc
                }
            });
        };

        function getObjectPropertyValue(obj: any, accessPath: string): any {
            const pathArray: string[] = accessPath.split('.');
            let value: any = obj;

            for (const key of pathArray) {
                if (value && value.hasOwnProperty(key)) {
                    value = value[key];
                } else {
                    return null;
                }
            }
            return value;
        }

        function compareValues(a: any, b: any): number {
            if (a === null && b === null) {
                return 0;
            } else if (a === null) {
                return -1;
            } else if (b === null) {
                return 1;
            }

            if (typeof a === 'string' && typeof b === 'string') {
                return a.localeCompare(b);
            } else {
                return a - b;
            }
        }

        const setDecimals = (value: any) => {
            let num = value;
            if (num.toString().indexOf(".") !== -1 && num.toString().split(".")[1].length > 2) {
                num = parseFloat(num).toFixed(2);
            }
            return num;
        }

        const handleShowMenu = (id: string = null) => {
            for (const el of timeEntries.value) {
                (id === el?.id) ? el.showOptions = !el.showOptions : el.showOptions = false;
            }
        }

        const handleMenu = (data: any) => {
            emit("handler", { option: data.option, timeEntry: data.timeEntry});
        }
        const viewDetails = (timeEntry: any ) => {
            emit("handler", { option: "viewDetails", timeEntry: timeEntry });
        }
        const launchSelection = (type: String, isSelected: Boolean) => {
            store.commit('timeEntries/updateTimeEntriesFilteredAdmin', timeEntries.value);
            emit("selected", type, isSelected);
        }

        const checkAllShow = (status: String): Boolean =>{
            if (status === "all") return false;//early return

            const validStatusSet = new Set(validateStatus.map((validStatus) => validStatus.toUpperCase()));
            for (const el of statusList.value) {
                if (status === el.id && validStatusSet.has(el.name.toUpperCase())) {
                    return true;
                }
            }

            return false;
        } 
        
        onMounted(async () => {
            if (location.href.includes("idDenied") || location.href.includes("idApproved")) {
                let idTimeEntry = location.href.split("=")[1];
                const timeEntry = timeEntries.value.filter((timeEntry: any) => timeEntry.id === idTimeEntry);
                if (timeEntry.length > 0) emit("handler", { option: "viewDetails", timeEntry: timeEntry[0] });
            }
        });

        return {
            showMenu,
            dateFormatted,
            dateFormattedWithHour,
            sortTableBy,
            theads,
            headerTableFixed,
            setDecimals,
            capitalize,
            handleShowMenu,
            filterTheads,
            timeEntries,
            handleMenu,
            viewDetails,
            checkAllShow,
            selectAll,
            status,
            launchSelection
        };

    },
});
</script>

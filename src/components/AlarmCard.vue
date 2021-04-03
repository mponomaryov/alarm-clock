<template>
    <v-card>
        <v-card-title>
            <v-btn
                text
                class="text-h4 text-normal pa-0"
                @click="setTime"
            >
                {{ time }}
            </v-btn>
            <v-spacer />
            <v-switch
                hide-details
                class="ma-0 pa-0"
                :input-value="alarm.active"
                @change="toggleActivity"
            />
        </v-card-title>

        <v-expand-transition>
            <div v-show="show">
                <v-card-text>
                    <v-checkbox
                        hide-details
                        label="Repeat"
                        class="ma-0 pa-0"
                        :input-value="alarm.repeat"
                        @change="toggleRepeatability"
                    />
                    <days-of-week-selector
                        v-show="alarm.repeat"
                        :selected-days="alarm.repeatDays"
                        @change="setRepeatDays"
                    />
                    <v-btn
                        text
                        class="pa-0 text-normal"
                        @click="setDescription"
                    >
                        <v-icon class="pr-2">
                            mdi-label-outline
                        </v-icon>
                        {{
                            alarm.description
                                ? alarm.description
                                : 'Description'
                        }}
                    </v-btn>
                </v-card-text>
                <v-divider />
            </div>
        </v-expand-transition>

        <v-card-actions class="px-4">
            <v-btn
                icon
                v-if="show"
                @click="remove"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <div v-else>
                {{ alarmInfo }}
            </div>
            <v-spacer />
            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>
                    {{
                        show
                            ? 'mdi-chevron-up'
                            : 'mdi-chevron-down'
                    }}
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import DaysOfWeekSelector from '@/components/DaysOfWeekSelector'
import TimePickerDialog from '@/components/TimePickerDialog'
import { formatTime } from '@/helpers'

const WeekDays = Object.freeze([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
])

export default {
    name: 'AlarmCard',

    components: {
        DaysOfWeekSelector,
    },

    props: {
        alarm: {
            type: Object,
            required: true,
        },

        currentHour: {
            type: Number,
            required: true,
        },

        currentMinute: {
            type: Number,
            required: true,
        },
    },

    data: () => ({
        show: false,
    }),

    methods: {
        setTime() {
        },

        toggleActivity() {
        },

        toggleRepeatability() {
        },

        setRepeatDays(days) {
        },

        setDescription() {
        },

        remove() {
        },
    },

    computed: {
        time() {
            const { hour, minute } = this.alarm

            return formatTime(hour, minute)
        },

        repeatDays() {
            const days = [...this.alarm.repeatDays]

            days.sort()

            return days
                .map(day => WeekDays[day])
                .join(', ')
        },

        alarmInfo() {
            let when
            const { hour, minute, repeat, description} = this.alarm
            const { currentHour, currentMinute } = this.$props

            if (repeat) {
                when = this.repeatDays
            } else {
                when = (hour - currentHour) * 60 + minute - currentMinute > 0
                    ? 'Today'
                    : 'Tomorrow'
            }

            return [when, description]
                .join(when && description ? ' \u2022 ' : '')
        },
    },
}
</script>

<style scoped>
    .text-normal {
        text-transform: none;
    }
</style>

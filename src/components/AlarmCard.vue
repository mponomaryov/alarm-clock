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
import { mapGetters, mapMutations } from 'vuex'

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
        ...mapMutations([
            'setAlarmTime',
            'removeAlarm',
            'toggleAlarmActivity',
            'toggleAlarmRepeatability',
            'setAlarmRepeatDays',
            'setAlarmDescription',
        ]),

        async setTime() {
            const result = await this.$dialog.showAndWait(TimePickerDialog, {
                hour: this.alarm.hour,
                minute: this.alarm.minute,
                use24Hours: this.use24Hours,
            })

            if (result) {
                try {
                    const [hour, minute] = result

                    this.setAlarmTime({
                        id: this.alarm.id,
                        hour,
                        minute,
                    })
                } catch {
                    /* empty */
                }
            }
        },

        toggleActivity() {
            this.toggleAlarmActivity(this.alarm.id)
        },

        toggleRepeatability() {
            this.toggleAlarmRepeatability(this.alarm.id)
        },

        setRepeatDays(days) {
            this.setAlarmRepeatDays({
                id: this.alarm.id,
                repeatDays: days,
            })
        },

        async setDescription() {
            const result = await this.$dialog.prompt({
                title: 'Set description',
                text: 'Description',
                value: this.alarm.description,
                persistent: false,
            })

            if (result || result === '') {
                this.setAlarmDescription({
                    id: this.alarm.id,
                    description: result,
                })
            }
        },

        remove() {
            this.removeAlarm(this.alarm.id)
        },
    },

    computed: {
        ...mapGetters([
            'use24Hours',
        ]),

        time() {
            const { hour, minute } = this.alarm

            return formatTime(hour, minute, {
                use24Hours: this.use24Hours,
                useAmPm: !this.use24Hours,
            })
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
            const { hour, minute, repeat, description } = this.alarm
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

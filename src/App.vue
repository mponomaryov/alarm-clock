<template>
    <v-app>
        <v-app-bar
            app
            dark
            color="red"
        >
            <v-icon x-large>mdi-alarm</v-icon>
            <v-toolbar-title>Alarm Clock</v-toolbar-title>
            <v-spacer />
            <v-btn
                icon
                @click="editSettings"
            >
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row>
                    <v-col>
                        <clock
                            class="mx-auto my-5"
                            :hour="hour"
                            :minute="minute"
                            :analog="useAnalogClock"
                            :use24Hours="use24Hours"
                        />
                    </v-col>
                </v-row>

                <v-row
                    v-for="alarm in alarms"
                    :key="alarm.id"
                >
                    <v-col>
                        <alarm-card
                            :alarm="alarm"
                            :currentHour="hour"
                            :currentMinute="minute"
                        />
                    </v-col>
                </v-row>

                <v-btn
                    fab
                    fixed
                    bottom
                    color="red"
                    style="left: 50%; transform: translateX(-50%);"
                    @click="createAlarm"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <audio
                    loop
                    ref="audio"
                    preload="auto"
                    style="display: none;"
                    :src="alarmSound"
                />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Clock from '@/components/Clock'
import AlarmCard from '@/components/AlarmCard'
import SettingsDialog from '@/components/SettingsDialog'
import TimePickerDialog from '@/components/TimePickerDialog'

import alarmSound from '@/assets/alarm-sound.mp3'

const MS_PER_MINUTE = 60000
const ALARM_DURATION = 30000  // 30 seconds

export default {
    name: 'App',

    components: {
        Clock,
        AlarmCard,
    },

    data: () => ({
        hour: 0,
        minute: 0,
        alarmSound,
        alarmStarted: false,
        alarmDuration: ALARM_DURATION,
    }),

    mounted() {
        this.audio = this.$refs.audio
        this.$vuetify.theme.dark = this.useDarkTheme
        this.startInterval(this.updateTime, MS_PER_MINUTE)
    },

    methods: {
        ...mapMutations([
            'addAlarm',
            'setUse24Hours',
            'setUseDarkTheme',
            'setUseAnalogClock',
            'toggleAlarmActivity',
        ]),

        startAlarm() {
            if (!this.alarmStarted) {
                this.audio.volume = this.volume / 100
                this.audio.play().then(() => {
                    this.alarmStarted = true
                    setTimeout(
                        this.stopAlarm.bind(this),
                        this.alarmDuration
                    )
                })
            }
        },

        stopAlarm() {
            if (this.alarmStarted) {
                this.alarmStarted = false
                this.audio.pause()
                this.audio.currentTime = 0
            }
        },

        async createAlarm() {
            const result = await this.$dialog.showAndWait(TimePickerDialog, {
                hour: this.hour,
                minute: this.minute,
                use24Hours: this.use24Hours,
            })

            if (result) {
                try {
                    const [hour, minute] = result

                    this.addAlarm({
                        hour,
                        minute,
                    })
                } catch {
                    /* empty */
                }
            }
        },

        editSettings() {
            this.$dialog.show(SettingsDialog)
        },

        getWeekDay(date) {
            return (date.getDay() + 6) % 7  // Week starts at Monday
        },

        updateTime(now) {
            [this.hour, this.minute] = [now.getHours(), now.getMinutes()]

            const weekDay = this.getWeekDay(now)

            const matchedAlarms = this.activeAlarms.filter(
                ({ hour, minute, repeat, repeatDays }) => (
                    hour === this.hour && minute === this.minute
                        && (repeat ? repeatDays.includes(weekDay) : true)
                )
            )

            if (matchedAlarms.length > 0) {
                this.startAlarm()
                matchedAlarms.forEach(
                    ({ id, repeat }) => (
                        !repeat
                            ? this.toggleAlarmActivity(id)
                            : () => {}
                    )
                )
            }
        },

        startInterval(callback, timeout) {
            const timer = () => {
                const now = timeout * Math.floor(Date.now() / timeout + 0.1)
                callback(new Date(now))
                setTimeout(timer, now + timeout - Date.now())
            }
            timer()
        },
    },

    computed: {
        ...mapGetters([
            'alarms',
            'activeAlarms',
            'use24Hours',
            'useDarkTheme',
            'useAnalogClock',
            'volume',
        ]),
    },

    watch: {
        useDarkTheme(value) {
            this.$vuetify.theme.dark = value
        },
    },
}
</script>

<template>
    <div class="clock-container">
        <svg
            viewBox="0 0 100 100"
            class="clock-face"
            :style="cssVars"
        >
            <circle
                cx="50"
                cy="50"
                r="49"
            />
            <template v-if="analog">
                <line
                    x1="50"
                    y1="20"
                    x2="50"
                    y2="55"
                    class="hour-hand"
                    :transform="`rotate(${ hour * 30 + minute * 0.5 } 50 50)`"
                />
                <line
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="55"
                    :transform="`rotate(${ minute * 6 } 50 50)`"
                />
            </template>
        </svg>
        <template v-if="!analog">
            <div class="indicator time text-h3 text-center">
                {{ time }}
            </div>
            <div
                v-if="!use24Hours"
                class="indicator ampm text-h6 text-center font-weight-light"
            >
                {{ ampm }}
            </div>
        </template>
    </div>
</template>

<script>
import { formatTime, amPm } from '@/helpers'

export default {
    name: 'Clock',

    props: {
        hour: {
            type: Number,
            required: true,
        },

        minute: {
            type: Number,
            required: true,
        },

        analog: {
            type: Boolean,
            default: true,
        },

        use24Hours: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        time() {
            const { hour, minute, use24Hours } = this.$props

            return formatTime(hour, minute, {
                use24Hours,
            })
        },

        ampm() {
            return amPm(this.hour)
        },

        cssVars() {
            return {
                '--stroke-color': this.$vuetify.theme.dark ? 'white' : 'black',
            }
        },
    },
}
</script>

<style scoped>
    .clock-container {
        width: 200px;
        height: 200px;
        position: relative;
    }

    .clock-face {
        width: 100%;
        height: 100%;
        stroke: var(--stroke-color);
        stroke-width: 1px;
        fill-opacity: 0;
    }

    .hour-hand {
        stroke-width: 2px;
    }

    .indicator {
        width: 100%;
        position: absolute;
        top: 50%;
    }

    .time {
        transform: translateY(-50%);
    }

    .ampm {
        transform: translateY(60%);
    }
</style>

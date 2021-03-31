<template>
    <dialog-card :actions="actions">
        <v-time-picker
            scrollable
            full-width
            ampm-in-title
            color="red"
            header-color="none"
            v-model="value"
            :format="use24Hours ? '24hr' : 'ampm'"
            @change="canSubmit = true"
        />
    </dialog-card>
</template>

<script>
import { formatTime } from '@/helpers'

export default {
    name: 'TimePickerDialog',

    props: {
        hour: {
            type: Number,
            default: 0,
        },

        minute: {
            type: Number,
            default: 0,
        },

        use24Hours: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            canSubmit: false,
            value: formatTime(this.hour, this.minute),
        }
    },

    computed: {
        actions() {
            return {
                false: 'Cancel',

                ok: {
                    text: 'Ok',
                    color: 'primary',
                    disabled: !this.canSubmit,
                    handler: () => (
                        this.value
                            .split(':')
                            .map(i => parseInt(i))
                    ),
                },
            }
        },
    },
}
</script>

<style scoped>
    /deep/ .v-time-picker-title {
        justify-content: center;
    }

    /deep/ .v-picker__body {
        background-color: inherit;
    }

    /deep/ .v-time-picker-clock {
        background-color: inherit;
    }
</style>

<template>
    <dialog-card :actions="actions">
        <v-switch
            hide-details
            label="Analog clock"
            class="v-input--reverse v-input--expand"
            v-model="useAnalogClock"
        />
        <v-switch
            hide-details
            label="Use 24 hours"
            class="v-input--reverse v-input--expand"
            v-model="use24Hours"
        />
        <v-switch
            hide-details
            label="Dark theme"
            class="v-input--reverse v-input--expand"
            v-model="useDarkTheme"
        />
        <v-slider
            thumb-label
            hide-details
            max="100"
            prepend-icon="mdi-volume-high"
            class="mt-4"
            v-model="volume"
            @click:prepend="() => {}"
        />
    </dialog-card>
</template>

<script>
export default {
    name: 'SettingsDialog',

    computed: {
        use24Hours: {
            get() {
            },

            set(value) {
            },
        },

        useDarkTheme: {
            get() {
            },

            set(value) {
            },
        },

        useAnalogClock: {
            get() {
            },

            set(value) {
            },
        },

        volume: {
            get() {
            },

            set(value) {
            },
        },

        actions: () => ({
            false: 'Close',
        }),
    },
}
</script>

<style scoped>
    /deep/ .v-input--reverse .v-input__slot {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }

    /deep/ .v-input--expand .v-input__slot .v-label {
        display: block;
        flex: 1;
    }
</style>

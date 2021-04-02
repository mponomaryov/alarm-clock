<template>
    <v-slide-group
        multiple
        :show-arrows="false"
        :value="selectedDays"
        @change="change"
    >
        <v-slide-item
            v-for="(day, index) in 'mtwtfss'"
            v-slot:default="{ active, toggle }"
            :key="index"
        >
            <v-btn
                icon
                @click="toggle"
            >
                <v-icon large>
                    {{
                        active
                            ? `mdi-alpha-${day}-circle`
                            : `mdi-alpha-${day}-circle-outline`
                    }}
                </v-icon>
            </v-btn>
        </v-slide-item>
    </v-slide-group>
</template>

<script>
export default {
    name: 'DaysOfWeekSelector',

    props: {
        selectedDays: {
            type: Array,
            default: () => [],
        },
    },

    methods: {
        change(value) {
            value = [...value]
            value.sort()
            this.$emit('change', value)
        },
    },
}
</script>

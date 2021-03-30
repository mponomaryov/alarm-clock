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
            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({}),
}
</script>

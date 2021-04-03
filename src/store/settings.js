const baseVolume = 10

const settings = {
    state: () => ({
        use24Hours: true,
        useDarkTheme: true,
        useAnalogClock: true,
        volume: baseVolume,
    }),

    mutations: {
        setUse24Hours: (state, value) => state.use24Hours = value,
        setUseDarkTheme: (state, value) => state.useDarkTheme = value,
        setUseAnalogClock: (state, value) => state.useAnalogClock = value,
        setVolume: (state, value) => state.volume = value,
    },

    getters: {
        use24Hours: state => state.use24Hours,
        useDarkTheme: state => state.useDarkTheme,
        useAnalogClock: state => state.useAnalogClock,
        volume: state => state.volume,
    },
}

export default settings

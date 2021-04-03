import { v4 as uuidv4 } from 'uuid'

const alarms = {
    state: () => ({
        items: [],
    }),

    mutations: {
        addAlarm: (state, payload) => {
            const { hour, minute } = payload

            state.items.push({
                id: uuidv4(),
                hour,
                minute,
                active: true,
                repeat: false,
                repeatDays: [],
                description: '',
            })
        },

        setAlarmTime: (state, payload) => {
            const { id, hour, minute } = payload

            const foundItem = state.items.find(i => i.id === id)

            if (foundItem) {
                foundItem.hour = hour
                foundItem.minute = minute
            }
        },

        removeAlarm: (state, id) => {
            state.items = state.items.filter(i => i.id !== id)
        },

        toggleAlarmActivity: (state, id) => {
            const foundItem = state.items.find(i => i.id === id)

            if (foundItem) {
                foundItem.active = !foundItem.active
            }
        },

        toggleAlarmRepeatability: (state, id) => {
            const foundItem = state.items.find(i => i.id === id)

            if (foundItem) {
                foundItem.repeat = !foundItem.repeat
                foundItem.repeatDays = []
            }
        },

        setAlarmRepeatDays: (state, payload) => {
            const { id, repeatDays } = payload

            const foundItem = state.items.find(i => i.id === id)

            if (foundItem) {
                foundItem.repeatDays = repeatDays
            }
        },

        setAlarmDescription: (state, payload) => {
            const { id, description } = payload

            const foundItem = state.items.find(i => i.id === id)

            if (foundItem) {
                foundItem.description = description
            }
        },
    },

    getters: {
        alarms: state => state.items,
        activeAlarms: state => state.items.filter(i => i.active),
    },
}

export default alarms

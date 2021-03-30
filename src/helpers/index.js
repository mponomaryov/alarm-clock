import padStart from 'lodash.padstart'
import partialRight from 'lodash.partialright'

const pad = partialRight(padStart, 2, '0')

const amPm = hour => hour >= 12 ? 'pm' : 'am'

const formatTime = (
        hour,
        minute,
        { use24Hours = true, useAmPm = false } = {}
) => {
    let amPmTemplate = ''

    if (!use24Hours) {
        amPmTemplate = useAmPm ? ` ${ amPm(hour) }` : ''
        hour = hour % 12 || 12
    }

    return `${ pad(hour) }:${ pad(minute) }${ amPmTemplate }`
}

export {
    amPm,
    formatTime,
}

const rawLocations = [
    "In-Person",
    "Virtual"
]
/* eslint-disable */
const locations = rawLocations.map((value, index) => {
    return {
        key: index,
        text: value,
        value: value
    }
})

export default locations;
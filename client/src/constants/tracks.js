const rawTracks = [
    "General",
    "Emerging"
]

const tracks = rawTracks.map((value, index) => {
    return {
        key: index,
        text: value,
        value: value
    }
})

export default tracks;
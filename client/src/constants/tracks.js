const rawTracks = [
    "Mental Health",
    "Inpatient Health",
    "Fitness & Nutrition",
    "Women's and Reproductive Health",
    "Global/Rural Health"
]

const tracks = rawTracks.map((value, index) => {
    return {
        key: index,
        text: value,
        value: value
    }
})

export default tracks;
const rawYears = ['1st', '2nd', '3rd', '4th and over']
/* eslint-disable */
const years = rawYears.map((current, index) => {
    return {
        key: index,
        text: current,
        value: current
    }
})

export default years;
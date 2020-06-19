const rawSchools = ['Georgia Tech']
const schools = rawSchools.map((current, index) => {
    return {
        key: index,
        text: current,
        value: current
    }
})

export default schools;
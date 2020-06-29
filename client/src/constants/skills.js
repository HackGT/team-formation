const rawSkills = ['React', 'Angular', 'GraphQL', 'NodeJS', 'HTML']
const skills = rawSkills.map((current, index) => {
    return {
        key: index,
        text: current,
        value: current
    }
})

export default skills;
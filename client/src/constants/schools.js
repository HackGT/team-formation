const fs = require('fs')
const rawSchools = fs.readFileSync('schools.txt', 'utf8').toString().split('\n');

const schools = rawSchools.map((current, index) => {
    return {
        key: index,
        text: current,
        value: current
    }
})


export default schools;

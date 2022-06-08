/* eslint-disable */
const rawSkills = [
          "Java",
          "Python",
          "C",
          "C++",
          "Web Development",
          "HTML/CSS",
          "Javascript",
          "GraphQL",
          "Node.js",
          "React",
          "Angular",
          "PHP",
          "Flask",
          "Ruby",
          "Django",
          "App Development",
          "iOS",
          "Android",
          "Databases",
          "MongoDB",
          "MySQL",
          "Data Science",
          "Data Visualization",
          "R",
          "Tableau",
          "Machine Learning",
          "Computer Vision",
          "Natural Language Processing",
          "Game Development",
          "Unity",
          "Virtual/Augmented Reality",
          "Cloud",
          "Cybersecurity"]
const skills = rawSkills.map((current, index) => {
    return {
        key: index,
        text: current,
        value: current
    }
})

export default skills;

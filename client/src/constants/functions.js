function truncateTeamName(name) {
    return name.length > 45 ? name.substring(0,42) + "..." : name
}

export default truncateTeamName
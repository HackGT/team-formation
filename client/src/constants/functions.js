/* eslint-disable */
function truncateTeamName(name) {
    return name ? name.length > 45 ? name.substring(0,42) + "..." : name : "";
}

export default truncateTeamName
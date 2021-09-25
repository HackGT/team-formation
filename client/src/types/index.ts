interface ITeam {
    id: any,
    name: string,
    picture: string,
    members: [User],
    interests: [string],
    description: string,
    project_idea: string,
    notifications: [any],
    public: boolean
}
export type Team = ITeam;

interface IUser {
    id: any,
    uuid: string,
    name: string,
    email: string,
    school: string,
    track: string,
    grad_year: string,
    beginner: boolean,
    skills: [string],
    experience: string,
    contact: string,
    contact_method: string,
    visible: number
    team: Team
    slackid: string
}
export type User = IUser;

interface INotification {
    id: any,
    message: string,
    bio: string,
    idea: string,
    sender: any,
    senderType: string,
    receiver: any,
    resolved: boolean,
}
export type Notification = INotification;
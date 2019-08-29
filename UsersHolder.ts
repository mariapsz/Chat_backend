import {User} from './DataTypes/User';

export class UsersHolder {
    private matches: [User[]]; // 1 < length < 2

    addUser = (user: User): void => {
        const lastIdx = this.matches.length - 1;
        if (this.matches[lastIdx].length < 2) {
            this.matches[lastIdx].push(user);
        } else {
            this.matches.push([user]);
        }
    };

    removeUser = (userSessionID: string): boolean => {
        const matchToRemoveIdx: number = this.getMatchIdxByUserSessionID(userSessionID);

        if (matchToRemoveIdx < 0)
            return false;

        if (this.matches[matchToRemoveIdx].length < 2) {
            this.matches.splice(matchToRemoveIdx, 1);
            return true;
        }

        //patchy match is always at the end of the matches array
        const matchWithOneUser: User[] = this.matches.splice(matchToRemoveIdx, 1)[0];
        this.matches.push(matchWithOneUser);
        return true;
    };

    getUserPartnersSessionIDByUserSessionID = (userSessionID: string): string | undefined => {
        const match: User[] | undefined = this.getMatchByUserSessionID(userSessionID);
        if (!match || match.length < 2)
            return undefined;
        return match.find((user: User) => user.sessionID !== userSessionID)!.sessionID;
    };

    private getMatchByUserSessionID = (userSessionID: string): User[] | undefined => (
        this.matches.find((match: User[]) => (
            !!match.find((user: User) => user.sessionID === userSessionID)
        ))
    );

    private getMatchIdxByUserSessionID = (userSessionID: string): number => (
        this.matches.findIndex((match: User[]) => (
            !!match.find((user: User) => user.sessionID === userSessionID)
        ))
    )
}
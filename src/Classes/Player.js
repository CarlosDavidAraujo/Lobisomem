export default class Player {
    constructor(name) {
        this.name = name;
        this.votesCount = 0;
        this.protected = false;
        this.role = null;
    }

    getName() {
        return this.name;
    }

    setRole(role) {
        this.role = role;
    }

    getRole() {
        return this.role;
    }

    getRoleName() {
        return this.role.getName();
    }

    votar(otherPlayer) {
        otherPlayer.setVotesCount();
    }

    getVotesCount() {
        return this.votesCount;
    }
    
    setVotesCount() {
        this.votesCount +=1;
    }

    setProtected(protectedState) {
        this.protected = protectedState;
    }

    isProtected() {
        return this.protected;
    }
}
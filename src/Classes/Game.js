import _ from 'lodash';
import { Aldeao, Vidente, Lobisomem, Cacador } from './Role';
import Player from './Player';

export default class Game {
    constructor() {
        this.players = [];
        this.currentPlayer = 0;
        this.mostVotedPlayer = null;
        this.removedPlayers = [];
        this.roles = [];
        this.news = [];
        this.roleMap = {
            "Aldeão": Aldeao,
            "Vidente": Vidente,
            "Lobisomem": Lobisomem,
            "Caçador": Cacador
        };
    }

    addRemovedPlayers(player) {
        this.removedPlayers.push(player)
    }

    getNews() {
        return this.news;
    }

    addNews(message) {
        this.news.push(message)
    }

    resetNews() {
        this.news = [];
    }

    getPlayers() {
        return this.players;
    }

    setPlayers(players) {
        players.forEach(player => {
            this.players.push(new Player(player));
        });
    }

    getCurrentPlayer() {
        const index = this.currentPlayer % this.players.length;
        return this.players[index];
    }

    passToNextPlayer() {
        this.currentPlayer++;
    }

    generateRoleInstances(selectedRoles) {
        for (const roleName in selectedRoles) {
            for (let i = 0; i < selectedRoles[roleName]; i++) {
                const role = new this.roleMap[roleName]();
                this.roles.push(role);
            }
        }
    }

    getRoles() {
        return this.roles;
    }

    assignRoleToPlayer(selectedRoles) {
        this.#checkPlayersAndRolesCounts(selectedRoles);
        this.generateRoleInstances(selectedRoles)
        this.players.forEach((player, i) => {
            player.setRole(this.roles[i]);
        });
    }

    #checkPlayersAndRolesCounts(selectedRoles) {
        const totalRoles = Object.values(selectedRoles).reduce((a, b) => a + b, 0);
        if (totalRoles !== this.players.length) {
            throw new Error('Quantidade de players e roles selecionados não confere');
        }
    }

    noNextPlayer() {
        if (this.currentPlayer > this.players.length - 1) {
            this.currentPlayer = 0;
            return true;
        }
    }

    removePlayers() {
        const updatedPlayers = this.players.filter(player => !this.removedPlayers.includes(player));
        this.players = updatedPlayers;
    }

    getLastPlayer() {
        return this.lastDeadPlayer;
    }

    getMostVotedPlayer() {
        let maxVotes = 0;
        let mostVotedPlayers = [];

        this.players.forEach(player => {
            if (player.getVotesCount() > maxVotes) {
                maxVotes = player.getVotesCount();
                mostVotedPlayers = [player];
            }
            else if (player.getVotesCount() === maxVotes) {
                mostVotedPlayers.push(player);
            }
        });


        if (mostVotedPlayers.length > 1) {
            //resolve emapte 
            this.mostVotedPlayer = mostVotedPlayers[Math.floor(Math.random() * mostVotedPlayers.length)];
        }
        else {
            this.mostVotedPlayer = mostVotedPlayers[0];
        }

        this.addRemovedPlayers(this.mostVotedPlayer);
        return this.mostVotedPlayer;
    }

    getWinnerTeam() {
        let winner = null;

        const remainingVillagers = this.players.filter(player => player.getRole().getTeam() === "Villagers");
        const remainingWerewolves = this.players.filter(player => player.getRole().getTeam() === "WereWolfs");

        if (remainingVillagers.length === 0) {
            winner = "lobisomens";
        } else if (remainingWerewolves.length === 0) {
            winner = "aldeões";
        }

        return winner;
    }

}

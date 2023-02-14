import _ from 'lodash';
import Hunter from './Hunter';
import News from './News';
import Player from './Player';
import Seer from './Seer';
import Villager from './Villager';
import WereWolf from './WereWolf';

export default class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.playersToRemove = [];
        this.roles = [];
        this.news = new News();
        this.roleMap = {
            "Aldeão": Villager,
            "Vidente": Seer,
            "Lobisomem": WereWolf,
            "Caçador": Hunter
        };
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
        return this.players[this.currentPlayerIndex];
    }

    passToNextPlayer() {
        this.currentPlayerIndex++;
    }

    noNextPlayer() {
        if (this.currentPlayerIndex > this.players.length - 1) {
            this.currentPlayerIndex = 0;
            return true;
        }
    }

    clearPlayersProtection() {
        this.players.forEach(player => {
            player.setProtected(false);
        });
    }

    clearPlayersVotes() {
        this.players.forEach(player => {
            player.clearVotes();
        });
    }

    noPlayerDied() {
        return this.playersToRemove.length === 0;
    }

    addPlayersToRemove(player) {
        if (!this.playersToRemove.includes(player)) {
            this.playersToRemove.push(player);
        }
    }

    removePlayers() {
        if (this.noPlayerDied()) {
            return this.news.setNews('Noite de paz na vila.');
        }

        const updatedPlayers = this.players.filter(player => !this.playersToRemove.includes(player) || player.isProtected());
        this.players = updatedPlayers;

        this.playersToRemove.forEach(player => {
            if (player.isProtected()) {
                this.news.addNews('Preces protegeram moradores.');
            } else {
                this.news.addNews(`${player.getName()} morreu esta noite!`);
            }
        });

        this.playersToRemove = [];
    }

    mostVotedPlayer() {
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
            //ninguem morre em caso de empate 
            return null;
        }

        return mostVotedPlayers[0];
    }

    sentenceToDeathMostVotedPlayer() {
        const mostVotedPlayer = this.mostVotedPlayer();

        if (!mostVotedPlayer) {
            return this.news.setNews('A aldeia ficou indecisa!');
        }

        const updatedPlayers = this.players.filter(player => player.getName() !== mostVotedPlayer.getName());
        this.players = updatedPlayers;
        this.news.setNews(`${mostVotedPlayer.getName()} foi morto pela aldeia`);

    }

    getNews() {
        return this.news.getNews();
    }

    clearTurnNews() {
        this.news.clearNews();
    }

    getWinnerTeam() {
        let winner = null;

        const remainingVillagers = this.players.filter(player => player.getRole().getTeam() === "Villagers");
        const remainingWerewolves = this.players.filter(player => player.getRole().getTeam() === "WereWolfs");

        if (remainingVillagers.length === 0) {
            this.news.setNews('Os lobisomens venceram');
            winner = true;
        } else if (remainingWerewolves.length === 0) {
            this.news.setNews('Os aldeões venceram');
            winner = true;
        }

        return winner;
    }

    generateRoleInstances(selectedRoles) {
        for (const roleName in selectedRoles) {
            for (let i = 0; i < selectedRoles[roleName]; i++) {
                const role = new this.roleMap[roleName]();
                this.roles.push(role);
            }
        }
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
}

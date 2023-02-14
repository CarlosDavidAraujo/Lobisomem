import Role from "./Role";

export default class Villager extends Role {
    constructor() {
        super('Aldeão', 'Villagers');
    }

    bisbilhotar(playerList, game) {
        const deathChance = 1;
        const discoverChance = 1;
        const randomNumber = Math.random();
        let message = '';
        let discoveredWereWolf;
        if (randomNumber <= discoverChance) {
            const deathNumber = Math.random();
            if (deathNumber <= deathChance) {
                game.addPlayersToRemove(game.getCurrentPlayer());
            } else {
                discoveredWereWolf = playerList.find(player => player.getRoleName() === 'Lobisomem');
                message = `${discoveredWereWolf.getName()} é um lobisomem entre nós!`
            }
        } 
        return message;
    }

    orar(otherPlayer) {
        const chance = Math.random();
        if (chance <= 1) {
            otherPlayer.setProtected(true);
        }
    }
}
class Role {
    constructor(name, team) {
        this.name = name;
        this.team = team;
    }

    getName() {
        return this.name;
    }

    getTeam() {
        return this.team;
    }
}

class Aldeao extends Role {
    constructor() {
        super('Aldeão', 'Villagers');
    }

    bisbilhotar(playerList, game) {
        const deathChance = 0.5;
        const discoverChance = 0.1;
        const randomNumber = Math.random();
        let message = '';
        let discoveredWereWolf;
        if (randomNumber <= discoverChance) {
            const deathNumber = Math.random();
            if (deathNumber <= deathChance) {
                const currentPlayer = game.getCurrentPlayer();
                game.addRemovedPlayers(currentPlayer);
                game.addNews(`${currentPlayer.getName()} foi morto esta noite`);
            } else {
                discoveredWereWolf = playerList.find(player => player.getRoleName() === 'Lobisomem');
                message = `${discoveredWereWolf.getName()} é um lobisomem entre nós!`
            }
        } 
        return message;
    }

    orar(otherPlayer) {
        const chance = Math.random();
        if (chance <= 0.1) {
            otherPlayer.setProtected(true);
            return `Oração feita por ${otherPlayer.getName()}.`
        }
    }
}

class Lobisomem extends Role {
    constructor() {
        super('Lobisomem', 'WereWolfs');
    }

    devorar(otherPlayer, game) {
        if (otherPlayer.isProtected()) {
            return 'Aldeão sobrevive a ataque de lobisomem graças a orações da comunidade, mas perde a memória e não lembra quem era a criatura';
        }
        else {
            game.addRemovedPlayers(otherPlayer);
            return `Lobisomem ataca: ${otherPlayer.getName()} foi dessa pra melhor.`
        }
    }
}

class Vidente extends Role {
    constructor() {
        super('Vidente', 'Villagers');
    }

    revelar(otherPlayer) {
        return `A verdade foi revelada! O papel de ${otherPlayer.getName()} é ${otherPlayer.getRoleName()}. 
        Fique atento à sua jogada!`;
    }
}

class Cacador extends Role {
    constructor() {
        super('Caçador', 'Villagers');
    }

    atirar(otherPlayer, game) {
        game.addRemovedPlayers(otherPlayer);
        return `Caçador mata ${otherPlayer.getName()}: foi dessa pra melhor.`
    }
}

export { Aldeao, Lobisomem, Cacador, Vidente }
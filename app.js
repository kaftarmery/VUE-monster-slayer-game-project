function getRandomValue(min, max) {
  // place the min and max as arguments in the Vue methods
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      attackRound: 0,

      // if it's not null it either holds a string of draw, player or monster
      winner: null,
      logMessages: [],

      green: "#0b8955",
      red: "#FF0000",
    };
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }

      return { width: this.playerHealth + "%" };
    },

    makeAttackGreen() {
      if (this.attackRound >= 3) {
        return { color: this.green };
      }
    },
    makeHealRed() {
      if (this.playerHealth <= 60) {
        return { color: this.red };
      }
    },
  },

  watch: {
    playerHealth(value) {
      // player lost or it's a draw
      if (value <= 0 && this.monsterHealth <= 0) {
        // it's a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    // monster lost or it's a draw
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
      }
    },
  },

  methods: {
    attackMonster() {
      this.round++;
      this.attackRound++;
      const attackValue = getRandomValue(7, 12);
      this.monsterHealth -= attackValue;

      this.addLogMessage("player", "hit", attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 14);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "hit", attackValue);
    },

    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 18);
      // if the number of playerHealth + whatever healValue it got from the button is bigger than 100
      if (this.playerHealth + healValue > 100) {
        // keep playerHealth to 100 if it tries to go above
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);

      // when the player wants to heal, the monster automatically attacks back
      this.attackPlayer();
    },

    specialAttack() {
      if (this.attackRound >= 3) {
        const attackValue = getRandomValue(9, 18);
        this.monsterHealth -= attackValue;
        this.round++;
        this.addLogMessage("player", "attack", attackValue);

        this.attackPlayer();

        if (this.attackRound === 3 || this.attackRound >= 4) {
          this.attackRound = 0;
        }
      }
    },
    surrender() {
      // this.playerHealth = 0;
      this.winner = "Monster";
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.attackRound = 0;
      this.logMessages = [];
    },

    // who won
    // what happened
    // how much damage was dealt
    addLogMessage(who, what, value) {
      // shit ads something at the end of the array
      // unshift adds it to the beginning of the array, pushing the other elements down
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");

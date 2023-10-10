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
      // general round that will be shown on screen
      // round: 0,

      // if it's not null it either holds a string of draw, player or monster
      winner: null,
      showButtons: true,

      green: "#0b8955",
      red: "#FF0000",
      // white: "FFFFFF",
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
      }
    },
    makeMonsterRed() {
      if (this.monsterHealth < 60) {
        return { background: this.red };
      }
    },

    playerBarStyles() {
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
        this.showButtons = null;
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
        this.showButtons = null;
      }
    },

    // monster lost or it's a draw
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = "draw";
        this.showButtons = null;
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
        this.showButtons = null;
      }
    },
  },

  methods: {
    attackMonster() {
      this.round++;
      this.attackRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      // directly call the next method (for the player attack by the monster)
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 16);
      this.playerHealth -= attackValue;
    },

    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      // if the number of playerHealth + whatever healValue it got from the button is bigger than 100
      if (this.playerHealth + healValue > 100) {
        // keep playerHealth to 100 if it tries to go above
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },

    specialAttack() {
      if (this.attackRound >= 3) {
        const attackValue = getRandomValue(8, 18);
        this.monsterHealth -= attackValue;
        this.round++;
        this.attackPlayer();

        if (this.attackRound === 3 || this.attackRound >= 4) {
          this.attackRound = 0;
        }
      }
    },
    surrender() {
      this.playerHealth = 0;
    },
    startNewGame() {
      (this.playerHealth = 100), (this.monsterHealth = 100);
      (this.winner = null), (this.attackRound = 0), (this.showButtons = true);
    },
  },
});

app.mount("#game");

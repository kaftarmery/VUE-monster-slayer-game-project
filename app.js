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
      healthRound: 0,
      round: 0,
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },

    lowHealthPlayer() {
      return this.playerHealth < 60 ? "red" : "green";
    },
  },

  methods: {
    attackMonster() {
      this.attackRound++;
      this.healthRound++;
      this.round++;
      const attackValue = getRandomValue(8, 15);
      this.monsterHealth -= attackValue;

      // directly call the next method (for the player attack by the monster)
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(5, 12);
      this.playerHealth -= attackValue;
    },

    healPlayer() {
      if (this.healthRound >= 4) {
        this.playerHealth += getRandomValue(3, 10);
      }
      if (this.healthRound === 4 || this.healthRound >= 4) {
        this.healthRound = 0;
      }
    },

    specialAttack() {
      if (this.attackRound >= 3) {
        const attackValue = getRandomValue(8, 15);
        this.monsterHealth -= attackValue;
        this.attackPlayer();

        if (this.attackRound === 3 || this.attackRound >= 4) {
          this.attackRound = 0;
        }
      }
    },
  },
  surrender() {
    this.playerHealth = 0;
  },
});

app.mount("#game");

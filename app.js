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
      round: 0,
      green: "#32CD32",
      red: "#FF0000",
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    makeGreen() {
      if (this.attackRound >= 3) {
        return { color: this.green };
      }
    },

    makeRedPlayer() {
      if (this.playerHealth < 80) {
        return { backgroundColor: this.red };
      }
    },
  },

  methods: {
    attackMonster() {
      this.attackRound++;
      this.round++;
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
      if (this.playerHealth + healValue > 100) {
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

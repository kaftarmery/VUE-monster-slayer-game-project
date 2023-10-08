function getRandomValue(min, max) {
  // place the min and max as arguments in the Vue methods
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },

  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;

      // directly call the next method (for the player attack by the monster)
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },

    healPlayer() {
      const counter = 0;
      this.playerHealth += getRandomValue(3, 10);
      counter = (counter + 1) % 60;
    },

    specialAttack() {
      const attackValue = getRandomValue(8, 15);
      this.monsterHealth -= attackValue;
    },

    surrender() {
      this.playerHealth = 0;
    },
  },
});

app.mount("#game");

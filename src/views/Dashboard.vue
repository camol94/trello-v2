<template>
    <div class="dashboard__container container">
      <h1 class="dashboard__title">Your dashboard.</h1>
      <div class="boardsWrapper">
        <div class="board" v-for="board in boards" v-bind:style="{background: board.color}" @click="redirect(board.name)">
          {{board.name}}
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
// $accent-color: red;

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: $main-color;
  line-height: 45px;
  &__container {
    margin: 0 auto;
    display: flex;
  justify-content: space-between;
  padding: 0 10px;
  }
  .icon {
    background: rgba(255,255,255,0.3);
    text-align: center;
    width: 30px;
    height: 30px;
    // border: 2px solid #fff;
    color: #fff;
    border-radius: 6px;
    margin: 5px;
    &:hover {
      background: rgba(255,255,255,0.18);
    }
    a {
      color: red;
    }
  }
}
.dashboard {
  min-height: 100vh;
  padding-top: 45px;
  &__title {
    text-align: center;
    font-size: 35px;
  }
  &__container {
    margin: 0 auto;
    margin: 0 auto;
  }
  .boardsWrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
    .board {
      min-height: 80px;
      border-radius: 6px;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      padding: 4px 12px;
    }
  }
}
</style>

<script>
export default {
  name: 'boards',
  components: {
    // HelloWorld
  },
  data() {
    return {
      boards: this.$store.state.boards
    }    
  },
  computed: {
      
  },
  methods: {
    redirect(name) {
      this.$router.push('/boards/' + name)
    }
  }
}
</script>
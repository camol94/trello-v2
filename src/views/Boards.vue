<template>
  <div class="dashboard">
    <navigation></navigation>
    <div class="dashboard__container container">
      <h1 class="dashboard__title">Your dashboard.</h1>
      <div class="boardsWrapper">
        <div class="board" v-for="board in boards" v-bind:style="{background: board.color}" @click="redirect(board.id)" :key="board.id">
          {{board.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import Navigation from '@/components/Navigation.vue'
export default {
  name: 'boards',
  components: {
    // Navigation
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
      this.$router.push('/board/' + name)
    }
  }
}
</script>

<style lang="scss">
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
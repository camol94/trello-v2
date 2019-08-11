<template>
    <div class="navigation">
      <div class="navigation__container">
        <div>
        <router-link to="/boards" class="navigation__home"><b-icon icon="home"></b-icon></router-link>   
      </div>
      <div>
        <b-icon icon="bell"></b-icon>
        <router-link to="/" class="navigation__exit"><b-icon icon="exit-to-app"></b-icon></router-link>
      </div>
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>
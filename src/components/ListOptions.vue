<template>
    <div class="list__options-wrapper" >
        <!-- <div class="overlay"></div>      -->
        <div class="list__options" id="options-menu" ref="optionsMenu">           
            <div class="list__options__header">
                <div class="list__options__header__title">
                    Actions menu {{list.title}}
                </div>
                <div class="list__options__header__close">
                    <span @click="closeOptions()"><b-icon pack="fas" icon="times" class="list__options__header__close-button" ></b-icon></span>
                </div>
            </div>
            <div class="list__options__content">
                <ul>
                    <li>Remove list</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    methods: {
        closeOptions() {
            this.$emit('closeOptions')
        }
    }
}

</script>
<style lang="scss">
    // .options-wrapper {
    //     display: none;
    // }
</style>
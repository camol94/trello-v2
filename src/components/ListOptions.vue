<template>
    <div>
        <span @click="toggleOptions">
            <b-icon pack="fas" icon="ellipsis-h" class="button-options" ></b-icon>
        </span>
        <div class="list__options-wrapper" v-if="list.actionMenu == true" v-on-clickaway="toggleOptions">
            <!-- <div class="list__options">
               <div @click="deleteList()">Delete list</div>
               <div @click="addNewTask()">Add new task</div>
            </div> -->
            <b-menu class="list__options">
                <b-menu-list>
                    <b-menu-item label="Delete list." @click="deleteList()"></b-menu-item>
                    <b-menu-item label="Add new task." @click="addNewTask()"></b-menu-item>
                </b-menu-list>
            </b-menu>
        </div>
    </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props: ['list', 'index', 'board'],
    mixins: [ clickaway ],
    methods: {
        toggleOptions() {
            this.list.actionMenu = !this.list.actionMenu;
        },
        deleteList() {
            this.board.lists.splice(this.index, 1);
        },
        addNewTask() {
            this.list.addingTask = !this.list.addingTask;
            this.toggleOptions();
        }
    }
}
</script>
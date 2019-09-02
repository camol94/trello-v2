<template>
    <div class="list add-new-list">
        <div v-if="!board.addingList" class="add-new-list__open-add-list" @click="board.addingList = !board.addingList">
            <b-icon pack="fas" icon="plus"></b-icon>Add new list.
        </div>                
        <div v-else class="add-new-list__add-list-controls" v-on-clickaway="cancelAddList">
            <input type="text" placeholder="Enter list name." class="add-new-list__input" v-model="addNewListTitle" v-focus>
            <b-button class="add-new-list__add-button" @click="addNewList(board)">Add list</b-button>
            <span @click="cancelAddList">
                <b-icon pack="fas" icon="times" class="add-new-list__close-button" ></b-icon>
            </span>
        </div>      
    </div> 
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    mixins: [ clickaway ],
    props: ['board'],
    data() {
        return {
            addNewListTitle: '',
        }
    },
    methods: {
        cancelAddList() {
            this.addNewListTitle = '',
            this.board.addingList = false;
        },
        addNewList(board) {
            // console.log(board.newListId)
            if (!this.addNewListTitle) {
                return
            }
            board.addingList = false;
            board.lists.push({
                id: board.newListId,
                title: this.addNewListTitle,
                editTitle: false,
                addingTask: false,
                actionMenu: false,
                newTaskId: 1,
                tasks: [],
            });
            board.newListId++;
            this.addNewListTitle = '';
            // console.log(board.newListId)
        },
    }
}
</script>
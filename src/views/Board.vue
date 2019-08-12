<template>
    <div class="dashboard">
        <navigation/>
        <div class="dashboard__container container" v-for="board in boards" :key="board.id">
            <h1 class="dashboard__title">Your dashboard. {{board.name}}</h1>
            <div v-for="list in board.lists" class="listWrapper" :key="list.id">
                <div class="list">
                    <div class="list__header">
                        <div v-if="!list.editTitle" @click="list.editTitle = !list.editTitle" class="list__header__title">
                            {{list.title}}
                        </div>
                        <input v-else type="text" v-model="list.title" @keyup.enter="list.editTitle = !list.editTitle" class="list__header__title__edit">
                        <b-icon pack="fas" icon="ellipsis-h" class="list__header__menu"></b-icon>
                    </div>                    
                    <div class="taskWrapper">
                        <div v-for="task in list.tasks" class="task" :key="task.id">
                            <b-icon pack="fas" icon="highlighter" class="task__edit"></b-icon>
                            <div class="task__labels">
                                <span v-for="label in task.labels" class="task__labels__label" v-bind:style="{ background: label.name}" :key="label.name"></span>
                            </div>
                            <div class="task__title">
                                {{task.title}}
                            </div>
                            <div class="task__text">
                                {{task.text}}
                            </div>
                        </div>                        
                    </div>
                    <div class="add-new-task">
                        <div class="add-new-list__open-add-list" @click="list.addingTask = !list.addingTask"
                        v-if="!list.addingTask" >
                            <b-icon pack="fas" icon="plus"></b-icon>Add new task.
                        </div>
                        <div v-else class="add-new-list__add-list-controls">
                            <input type="text" placeholder="Enter task name." class="add-new-list__input">
                            <b-button class="add-new-list__add-button">Add task</b-button>
                            <span @click="list.addingTask = !list.addingTask">
                                <b-icon pack="fas" icon="times" class="add-new-list__close-button"></b-icon>
                            </span>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="listWrapper">                
                <div class="list add-new-list">
                    <div v-if="!board.addingList" class="add-new-list__open-add-list" @click="board.addingList = !board.addingList">
                    <b-icon pack="fas" icon="plus"></b-icon>Add new list.
                </div>                
                <div v-else class="add-new-list__add-list-controls">
                    <input type="text" placeholder="Enter list name." class="add-new-list__input" v-model="addNewListTitle">
                    <b-button class="add-new-list__add-button" @click="addNewList(board)">Add list</b-button>
                    <span><b-icon pack="fas" icon="times" class="add-new-list__close-button"></b-icon></span>
                </div>      
                </div>              
            </div>
        </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            boardId: this.$route.params.id,
            addNewListTitle: '',
            // getBoards: this.$store.state.boards
            // board: this.$store.state.board,
        }
    },
    computed: {
        boards() {
            return this.$store.state.boards.filter(v => v.id == this.boardId)
        }
    },
    methods: {
        addNewList(board) {
            board.addingList = false;
            board.lists.push({
                id: 3,
                title: this.addNewListTitle,
            })
        },
        addNewTask() {
            console.log('new task')
        }
    }
}
</script>
<style lang="scss">
input {
    width: 100%;
    border-radius: 4px;
    border: 2px solid #ccc;
    padding: 4px;
    font-size: 16px;
}
.dashboard {
    min-height: 100vh;
    padding-top: 45px;
    &__title {
        text-align: center;
        font-size: 35px;
    }
    &__container {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        position: absolute;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin: 0 auto;
    }
}
.listWrapper {
    display: inline-block;
    vertical-align: top;
}
.list {
    
    width: 250px;
    background: darken($color: #ffffff, $amount: 12%);
    border: 1px solid #ccc;
    border-radius: 4px;
    
    margin: 10px;
    padding: 12px;
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__title {
        font-size: 16px;
        font-weight: 700;
            &__edit {
                font-size: 10px;
            }
        }
        
        &__menu {
            @include icon-square;
            font-size: 13px;
            color: #aaa;            
            cursor: pointer;
            &:hover {
                background: rgba($color: #000000, $alpha: 0.1)
            }
        }
    }
}
.taskWrapper {
    .task {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 8px 0;
        background: darken($color: #ffffff, $amount: 4%);
        position: relative;
        cursor: pointer;
        &__edit {
            @include icon-square;
            font-size: 10px;
            color: #aaa;
            cursor: pointer;
            position: absolute;
            top: 4px;
            right: 4px;
            opacity: 0;
            
        }
        &__title {
            font-weight: 700;
            font-size: 15px;
            white-space: normal;
        }
        &__text {
            font-size: 14px;
            white-space: normal;
        }
        &__labels {
            width: 100%;
            &__label {
                width: 30px;
                height: 6px;
                display: inline-block;
                border-radius: 4px;
                margin-right: 4px;
            }
        }
        &:hover {
        background: darken($color: #ffffff, $amount: 8%);
            .task__edit {
                opacity: 1;
            }
        }
    }
}
.add-new-task {
    // text-align: center;
    // font-size: 20px;
    // line-height: 33px;
    // cursor: pointer;
}
.add-new-list, .add-new-task {
    &__open-add-list {
        display: flex;
        cursor: pointer;
    }
    &__add-list-controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    &__input {
        margin-bottom: 5px;
    }
    &__add-button {
        margin-right: 5px;
    }
    &__close-button {
        @include icon-square;
        
    }
}
button {
    // margin: 5px;
}
</style>

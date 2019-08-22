<template>
    <div class="dashboard">
        <navigation/>
        <div class="dashboard__container" v-for="board in boards" :key="board.id">
            <h1 class="dashboard__title">Your dashboard. {{board.name}}</h1>
            <div v-for="list in board.lists" class="listWrapper" :key="list.id">
                <div class="list">
                    <div class="list__header">
                        <div v-if="!list.editTitle" @click="list.editTitle = !list.editTitle" class="list__header__title">
                            {{list.title}}
                        </div>
                        <input v-else type="text" v-model="list.title" @keyup.enter="list.editTitle = !list.editTitle" class="list__header__title__edit">
                        <!-- <span @click="toggleListOptions(list)" ref="listOptions">
                            <b-icon pack="fas" icon="ellipsis-h" class="list__header__menu"></b-icon>
                        </span> -->
                        <!-- <listoptions v-show="list.actionMenu" @closeOptions="toggleListOptions(list)" ></listoptions> -->
                        <b-dropdown>
                            <button class="button list__header__menu" slot="trigger">
                                <b-icon pack="fas" icon="ellipsis-h" ></b-icon>
                            </button>
                            <div class="test">test</div>
                            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                        </b-dropdown>
                        
                        <div v-show="list.actionMenu" class="list__options-wrapper" >    
                            <div class="list__options">
                                <div class="list__options__header">
                                    <div class="list__options__header__title">
                                        Actions menu {{list.title}}
                                    </div>
                                    <div class="list__options__header__close">
                                        <span @click="toggleListOptions(list)"><b-icon pack="fas" icon="times" class="list__options__header__close-button" ></b-icon></span>
                                    </div>
                                </div>
                                <div class="list__options__content">
                                    <ul>
                                        <li>Remove list</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="taskWrapper">
                        <div v-for="task in list.tasks" class="task" :key="task.id">
                            <span @click="toggleTaskOptions(task)">
                                <b-icon pack="fas" icon="highlighter" class="task__edit"></b-icon>
                            </span>
                            <div v-show="task.actionMenu" class="task__options-wrapper" >    
                                <div class="task__options">
                                    <div class="task__options__header">
                                        <div class="task__options__header__title">
                                            Actions menu {{task.title}}
                                        </div>
                                        <div class="task__options__header__close">
                                            <span @click="toggleTaskOptions(task)"><b-icon pack="fas" icon="times" class="list__options__header__close-button" ></b-icon></span>
                                        </div>
                                    </div>
                                    <div class="task__options__content">
                                        <ul>
                                            <li>Remove list</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
                            <input type="text" placeholder="Enter task name." class="add-new-list__input" v-model="addNewTaskTitle">
                            <b-button class="add-new-list__add-button" @click="addNewTask(list)">Add task</b-button>
                            <span @click="list.addingTask = !list.addingTask">
                                <b-icon pack="fas" icon="times" class="add-new-list__close-button"></b-icon>
                            </span>
                        </div> 
                    </div>                    
                </div>
            </div>
            <div class="listWrapper">                
                <div class="list add-new-list">
                    <div v-if="!board.addingList" class="add-new-list__open-add-list" @click="toggleAddingList(board)">
                    <b-icon pack="fas" icon="plus"></b-icon>Add new list.
                </div>                
                <div v-else class="add-new-list__add-list-controls">
                    <input type="text" placeholder="Enter list name." class="add-new-list__input" v-model="addNewListTitle">
                    <b-button class="add-new-list__add-button" @click="addNewList(board)">Add list</b-button>
                    <span @click="toggleAddingList(board)"><b-icon pack="fas" icon="times" class="add-new-list__close-button" ></b-icon></span>
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
            addNewTaskTitle: '',
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
        addNewTask(list) {
            console.log('Task title: ' + this.addNewTaskTitle);
            if (!this.addNewTaskTitle) {
                return
            }
            list.addingTask = false;
            list.tasks.push({
                id: list.newTaskId,
                title: this.addNewTaskTitle,
                text: '',
                labels: [],
            })
            list.newTaskId++;
            this.addNewTaskTitle = '';
        },
        toggleAddingList(board) {
            board.addingList = !board.addingList;
        },
        toggleListOptions(list) {
            list.actionMenu = !list.actionMenu;
        },
        toggleTaskOptions(task) {
            task.actionMenu = !task.actionMenu;
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
    position: relative;
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
    &__options-wrapper {
        position: absolute;
        top: 50px;
        right: -179px;
        z-index: 123;
        width: 220px;
    }
    &__options {        
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        &__header {
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 5px;
            &__close-button {
                @include icon-square;
            }
        }
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
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
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        position: relatie;
        &__options-wrapper {
            position: absolute;
            top: -1px;
            right: -220px;
            z-index: 123;
            width: 220px;
        }
        &__options {        
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            &__header {
                border-bottom: 1px solid #ccc;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 5px;
                &__close-button {
                    @include icon-square;
                }
            }
    }
        &__edit {
            @include icon-square;
            font-size: 10px;
            color: #aaa;
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
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
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

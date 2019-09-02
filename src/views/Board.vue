<template>
    <div class="dashboard">
        <navigation/>
        <div class="dashboard__container" v-for="board in boards" :key="board.id">
            <h1 class="dashboard__title">Your dashboard. {{board.name}}</h1>
            <div class="listWrapper" v-for="(list, index) in board.lists" :key="list.id">
                <div class="list">
                    <div class="list__header">
                        <div v-if="!list.editTitle" @click="list.editTitle = !list.editTitle" class="list__header__title">
                            {{list.title}}
                        </div>
                        <input v-else type="text" v-model="list.title" @keyup.enter="list.editTitle = !list.editTitle" class="list__header__title__edit">
                        <ListOptions :list="list" :index="index" :board="board"/>
                    </div>                    
                    <div class="taskWrapper">
                        <TaskItem v-for="(task, index) in list.tasks" :task="task" :key="task.id" class="task">
                            <TaskOptions :task="task" :index="index" :list="list"/> 
                        </TaskItem>
                                              
                    </div>
                    <TaskAddNew :list="list"/>
                </div>
            </div>

            <div class="listWrapper">
                <ListAddNewList :board="board"/>  
            </div>
        </div>
        </div>
</template>

<script>

import { mixin as clickaway } from 'vue-clickaway';
import TaskItem from '@/components/TaskItem.vue'
import TaskOptions from '@/components/TaskOptions.vue'
import TaskAddNew from '@/components/TaskAddNew.vue'
import ListAddNewList from '@/components/ListAddNewList.vue'
import ListOptions from '@/components/ListOptions.vue'

export default {
    mixins: [ clickaway ],
    components: {
        TaskAddNew,
        TaskItem,
        TaskOptions,
        ListAddNewList,
        ListOptions
    },
    data() {
        return {
            boardId: this.$route.params.id,
            addNewListTitle: '',
            addNewTaskTitle: '',
            isAddindTaskModalActive: false,
            checkboxGroup: [],
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
    //     addNewTask(list) {
    //         console.log('Task title: ' + this.addNewTaskTitle);
    //         if (!this.addNewTaskTitle) {
    //             return
    //         }
    //         list.addingTask = false;
    //         list.tasks.push({
    //             id: list.newTaskId,
    //             title: this.addNewTaskTitle,
    //             text: '',
    //             labels: [],
    //         })
    //         list.newTaskId++;
    //         this.addNewTaskTitle = '';
    //     },
    //     toggleAddingList(board) {
    //         board.addingList = !board.addingList;
    //     },
    //     toggleListOptions(list) {
    //         list.actionMenu = !list.actionMenu;
    //     }
    },
    directives: {
        focus: {
            // directive definition
            inserted: function(el) {
                el.focus();
            }
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
    height: 100%;
}
.list {
    display: flex;
    flex-direction: column;
    width: 250px;
    background: darken($color: #ffffff, $amount: 12%);
    border: 1px solid #ccc;
    border-radius: 4px;    
    margin: 10px;
    padding: 12px;
    position: relative;
    max-height: 84%;
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
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
    overflow: auto;
    padding-right: 5px;    
    .task {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 8px;
        margin-bottom: 5px;
        background: darken($color: #ffffff, $amount: 4%);
        position: relative;
        cursor: pointer;
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        position: relatie;
        &__options-wrapper {
            cursor: auto;
            position: fixed;
            z-index: 123;
            right: 0;
            top: 45px;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background:rgba($color: #000000, $alpha: 0.4)
        }
        &__options {
            width: 700px;        
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            flex-wrap: wrap;
            &__header {
                font-weight: 800;
                display: flex;
                align-items: center;
                padding-bottom: 5px;
                .button {
                    margin-left: 10px;
                }
            }
            &__labels {
                
                &-list {
                    position: relative;
                    display: flex;
                    align-content: center;
                    align-items: center;
                }
                &-addLabelWindow {                    
                    position: absolute;
                    background: white;
                    padding: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #ccc;
                    flex-wrap: wrap;
                    width: 114px;
                }
            }
            &__label {
                width: 30px;
                height: 30px;
                display: inline-block;
                border-radius: 4px;
                margin: 2px;
                
                line-height: 32px;
                
            }
            &__menu {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-content: flex-start;
            }
            .add-new-label {
                    text-align: center;
                    background: #dedede;
                }
            &__close-button {
                    @include icon-square;
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
            display: flex;
                flex-wrap: wrap;
            &__label {
                width: 30px;
                height: 6px;
                display: inline-block;
                border-radius: 4px;
                margin: 2px;
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
.button-options {
    @include icon-square;
    font-size: 13px;
    color: #aaa;            
    cursor: pointer;
    background: transparent;
    border: none;
    &:hover {
        background: rgba($color: #000000, $alpha: 0.1)
    }
}
.modal-background {
    background-color: rgba(10, 10, 10, 0.56)
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-button {
  width: 1px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
::-webkit-scrollbar-thumb:active {
  background: #ababab;
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #ffffff;
}
::-webkit-scrollbar-track:active {
  background: #ffffff;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
<template>
    <div class="dashboard">
        <navigation/>
        <div class="dashboard__container container" v-for="board in boards" :key="board.id">
            <h1 class="dashboard__title">Your dashboard. {{board.name}}</h1>
            <div v-for="list in board.lists" class="listWrapper" :key="list.id">
                <div class="boardList">
                    <div class="boardList__header">
                        <div v-if="!list.editTitle" @click="list.editTitle = !list.editTitle" class="boardList__header__title">
                            {{list.title}}
                        </div>
                        <input v-else type="text" v-model="list.title" @keyup.enter="list.editTitle = !list.editTitle" class="boardList__header__title__edit">
                        <b-icon pack="fas" icon="ellipsis-h" class="boardList__header__menu"></b-icon>
                    </div>                    
                    <div class="taskWrapper">
                        <div v-for="task in list.tasks" class="task" :key="task.id">
                            <!-- <i class="fas fa-highlighter"></i> -->
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
                    <div v-if="!list.addingTask" @click="list.addingTask = !list.addingTask" class="addNewTask">Add task</div>
                    <input v-else type="text" placeholder="Add new task." @keyup.enter="list.addingTask = !list.addingTask">


                </div>
            </div>
            <div class="listWrapper">
                <input type="text" placeholder="Add new list.">
            </div>
        </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            boardId: this.$route.params.id,
            // getBoards: this.$store.state.boards
        }
    },
    computed: {
        boards() {
            return this.$store.state.boards.filter(v => v.id == this.boardId)
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
    vertical-align: top;
    width: 250px;
    background: darken($color: #ffffff, $amount: 12%);
    border: 1px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    margin: 10px;
    padding: 6px 12px 12px;
}
.boardList {
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
            &:hover {
                background: rgba($color: #000000, $alpha: 0.1)
            }
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
        background: darken($color: #ffffff, $amount: 6%);
            .task__edit {
                opacity: 1;
            }
        }
    }
}
.addNewTask {
    text-align: center;
    font-size: 20px;
    line-height: 33px;
    cursor: pointer;    
}
</style>

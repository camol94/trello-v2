<template>
    <div class="add-new-task">
        <div class="add-new-list__open-add-list" @click="list.addingTask = !list.addingTask" v-if="!list.addingTask" >
            <b-icon pack="fas" icon="plus"></b-icon>Add new task.
        </div>
        <div v-else class="add-new-list__add-list-controls" v-on-clickaway="cancelAddTask">
            <input type="text" placeholder="Enter task name." class="add-new-list__input" v-model="addNewTaskTitle" v-focus>
            <b-button class="button" @click="addNewTask(list)">Add task</b-button>
            <span @click="cancelAddTask">
                <b-icon pack="fas" icon="times" class="button-options"></b-icon>
            </span>
        </div>
    </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props: ['list'],
    mixins: [ clickaway ],
    data() {
        return {
            addNewTaskTitle: '',
        }
    },
    methods: {
        cancelAddTask() {
            this.addNewTaskTitle = '';
            this.list.addingTask = false;        
        },
        addNewTask(list) {
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
    }
}
</script>
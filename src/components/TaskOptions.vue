<template>
    <div>
        <span @click="toggleOptions">
            <b-icon pack="fas" icon="highlighter" class="task__edit"></b-icon>
        </span>
        <div class="task__options-wrapper" v-if="task.actionMenu == true">
            <div class="task__options columns" v-on-clickaway="toggleOptions">
                <div class="column is-full">
                    <div class="task__options__header">
                        {{task.title}}
                    </div>
                </div>
               <div class="column is-four-fifths">
                    <div class="task__options__desc">
                        <div class="task__options__header">
                        Description 
                        <b-button class="button is-small" >Edit</b-button>
                    </div>
                    {{task.text}}
                    </div>
                    <div class="task__options__labels">
                        <div class="task__options__header">
                        Labels
                        </div>
                        <div class="task__options__labels-list" v-on-clickaway="closeLabelWindow">
                            <span v-for="(label, index) in task.labels" class="task__options__label" v-bind:style="{ background: label}" :key="index" @click="removeLabel(label)"></span>
                            <span style="position: relative;" @click="toggleLabelWindow"><b-icon pack="fas" icon="plus" class="task__options__label add-new-label" ></b-icon>
                                <div class="task__options__labels-addLabelWindow" v-if="labelWindow" >
                                    <h3 style="width: 100%; text-align: center;">Labels</h3>
                                    <span v-for="(color, index) in labelsColors" class="task__options__label" v-bind:style="{ background: color}" :key="index" @click="addLabel(color)"></span>
                                </div>
                            </span>
                            
                        </div>
                    </div>
               </div>
               <div class="column is-one-fifth task__options__menu">
                   <b-button class="button is-small">
                       Remove Task.
                   </b-button>
                   <b-button class="button is-small">
                       Add label.
                   </b-button>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props: ['task', 'list'],
    mixins: [ clickaway ],
    data() {
        return {
            labelColor: '',
            labelsColors: ['red', 'green', 'blue', 'pink', 'yellow', 'grey', 'black', 'orange', 'cyan'],
            labelWindow: false,
        }
    },
    methods: {
        toggleOptions() {
            this.task.actionMenu = !this.task.actionMenu;
        },
        deleteTask() {
            this.list.tasks.splice(this.index, 1);
        },
        toggleLabelWindow() {
            this.labelWindow = !this.labelWindow
        },
        closeLabelWindow() {
            this.labelWindow = false
        },
        addLabel(color) {
            var exist = this.task.labels.includes(color);
            if (!exist) {
                console.log('nie zawiera')
                console.log('Klikniety kolor: ' + color)
                this.task.labels.push(color)
            }
        },
        removeLabel(label) {
            console.log(label);
            this.task.labels.splice(label, 1);
        }
    }
}
</script>
<template>
    <div>        
        <div class="task__labels">
            <span v-for="(label, index) in task.labels" class="task__labels__label" v-bind:style="{ background: label}"  :key="index"></span>
        </div>
        <div class="task__title">
        {{task.title}}
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['task']
}
</script>
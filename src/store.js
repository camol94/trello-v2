import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boards: [
      {
        id: 1,
        name: 'test 1',
        color: 'blue',
        image: 'https://images.freeimages.com/images/large-previews/85a/daisy-s-1375598.jpg',
        addingList: false,
        newListId: 3,
        lists: [          
          {
            id: 1,
            title: 'list 1',
            editTitle: false,
            addingTask: false,
            actionMenu: false,
            newTaskId: 3,          
            tasks: [
              {
                id: 1,
                title: 'task 1',
                text: 'Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet...',
                actionMenu: false,                
                labels: ['red', 'blue']
              },
              {
                id: 2,
                title: 'task 2',
                text: 'Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet...',
                actionMenu: false, 
                labels: [],
              }
            ]
          },
          {
            id: 2,
            title: 'list 2',
            editTitle: false,
            addingTask: false,
            actionMenu: false,
            newTaskId: 2,
            tasks: [
              {
                id: 1,
                title: 'task 1',
                text: 'Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet...',
                labels: [
                  ['red']
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Board 2',
        color: 'green',
        image: 'https://images.freeimages.com/images/large-previews/85a/daisy-s-1375598.jpg',
        lists: [
          {
            id: 1,
            title: 'list 1',
            tasks: [
              {
                id: 1,
                title: 'task 1',
              }
            ]
          },
          {
            id: 2,
            title: 'list 2',
            tasks: [
              {
                id: 1,
                title: 'task 1'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Board 3',
        color: 'red',
        image: 'https://images.freeimages.com/images/large-previews/85a/daisy-s-1375598.jpg',
        lists: [
          {
            id: 1,
            title: 'list 1',
            tasks: [
              {
                id: 1,
                title: 'task 1',
              }
            ]
          },
          {
            id: 2,
            title: 'list 2',
            tasks: [
              {
                id: 1,
                title: 'task 1'
              }
            ]
          }
        ]
      }
    ]
  },
  getters: {
    // getBoard: state => state.boards.filter(v => v.id == this.$route.params.id)
  },
  mutations: {

  },
  actions: {

  }
})

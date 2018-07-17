const initialState = {
  noted: {
    nodes: {
      byId: {
        1: {
          id: 1,
          name: 'Software',
          parentId: null,
          childIds: [2],
          toggled: true
        },
        2: {
          id: 2,
          name: 'Projects',
          parentId: 1,
          childIds: [3, 4],
          toggled: false
        },
        3: {
          id: 3,
          name: 'Hopper',
          parentId: 2,
          childIds: [],
          toggled: false
        },
        4: {
          id: 4,
          name: 'Noted',
          parentId: 2,
          childIds: [],
          toggled: false
        },
        5: {
          id: 5,
          name: 'Python',
          parentId: 1,
          childIds: [],
          toggled: false
        },
        6: {
          id: 6,
          name: 'Books',
          parentId: null,
          childIds: [7,8],
          toggled: true
        },
        7: {
          id: 7,
          name: '1984',
          parentId: 6,
          childIds: [],
          toggled: false
        },
        8: {
          id: 8,
          name: 'Brave New World',
          parentId: 6,
          childIds: [],
          toggled: false
        }
      },
      allIds: [1,2,3,4,5,6,7,8]
    }
  }
}

export default initialState;

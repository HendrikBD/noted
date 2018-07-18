const initialState = {
  noted: {
    nodes: {
      byId: {
        0: {
          name: 'root',
          parentNode: null,
          childNodes: [1, 6],
        },
        1: {
          id: 1,
          name: 'Software',
          parentNode: 0,
          childNodes: [2,5],
          toggled: true,
          traceHeight: 0
        },
        2: {
          id: 2,
          name: 'Projects',
          parentNode: 1,
          childNodes: [3, 4],
          toggled: true,
          traceHeight: 0
        },
        3: {
          id: 3,
          name: 'Hopper',
          parentNode: 2,
          childNodes: [],
          toggled: false,
          traceHeight: 0
        },
        4: {
          id: 4,
          name: 'Noted',
          parentNode: 2,
          childNodes: [],
          toggled: false,
          traceHeight: 0
        },
        5: {
          id: 5,
          name: 'Python',
          parentNode: 1,
          childNodes: [],
          toggled: false,
          traceHeight: 0
        },
        6: {
          id: 6,
          name: 'Books',
          parentNode: 0,
          childNodes: [7,8],
          toggled: true,
          traceHeight: 0
        },
        7: {
          id: 7,
          name: '1984',
          parentNode: 6,
          childNodes: [],
          toggled: false,
          traceHeight: 0
        },
        8: {
          id: 8,
          name: 'Brave New World',
          parentNode: 6,
          childNodes: [],
          toggled: false,
          traceHeight: 0
        }
      },
      allIds: [0,1,2,3,4,5,6,7,8]
    }
  }
}

export default initialState;

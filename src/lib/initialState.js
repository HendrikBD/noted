const initialState = {
  noted: {
    nodes: {
      byId: {
        0: {
          name: 'root',
          parentNode: null,
          childNodes: [1,6],
          traceHeights: [0,0],
        },
        1: {
          id: 1,
          name: 'Software',
          parentNode: 0,
          childNodes: [2,5],
          traceHeight: 0,
          traceWidths:  [0,0],
          childHeights: [0,0],
          toggled: true
        },
        2: {
          id: 2,
          name: 'Projects',
          parentNode: 1,
          childNodes: [3,4],
          traceHeight: 0,
          traceWidths: [0,0],
          childHeights: [0,0],
          toggled: false,
        },
        3: {
          id: 3,
          name: 'Hopper',
          parentNode: 2,
          childNodes: [],
          traceHeight: 0,
          traceWidths: [],
          childHeights: [],
          toggled: false,
        },
        4: {
          id: 4,
          name: 'Noted',
          parentNode: 2,
          childNodes: [],
          traceHeight: 0,
          traceWidths: [],
          childHeights: [],
          toggled: false,
        },
        5: {
          id: 5,
          name: 'Python',
          parentNode: 1,
          childNodes: [],
          traceHeight: 0,
          traceWidths: [],
          childHeights: [],
          toggled: false,
        },
        6: {
          id: 6,
          name: 'Books',
          parentNode: 0,
          childNodes: [7,8],
          traceHeight: 0,
          traceWidths: [0,0],
          childHeights: [0,0],
          toggled: true,
        },
        7: {
          id: 7,
          name: '1984',
          parentNode: 6,
          childNodes: [],
          traceHeight: 0,
          traceWidths: [],
          childHeights: [],
          toggled: false,
        },
        8: {
          id: 8,
          name: 'Brave New World',
          parentNode: 6,
          childNodes: [],
          traceHeight: 0,
          traceWidths: [],
          childHeights: [],
          toggled: false,
        }
      },
      allIds: [0,1,2,3,4,5,6,7,8]
    }
  }
}

export default initialState;

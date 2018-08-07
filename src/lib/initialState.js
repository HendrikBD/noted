const initialState = {
  noted: {
    nodes: {
      byId: {
        0: {
          // Root node, the parent of all highest level nodes, where all information stems
          name: 'root',
          parentNode: null,
          childNodes: [1,6],
          height: 0,
          traceHeights: [0,0],
          toggled: true
        },
        1: {
          id: 1,
          name: 'Software',
          toggled: true,
          parentNode: 0,
          childNodes: [2,5,10],
          trace: {
            height: 0,
            childHeights: [0,0,0],
            childTraceWidths: [0,0,0]
          },

          traceHeight: 0,
          traceWidths:  [0,0,0],
        },
        2: {
          id: 2,
          name: 'Projects',
          toggled: true,
          parentNode: 1,
          childNodes: [3,4],
          trace: {
            height: 0,
            childHeights: [0,0],
            childTraceWidths: [0,0]
          },

          traceHeight: 0,
          traceWidths: [0,0],
        },
        3: {
          id: 3,
          name: 'Hopper',
          toggled: false,
          parentNode: 2,
          childNodes: [9],
          trace: {
            height: 0,
            childHeights: [0],
            childTraceWidths: [0]
          },

          traceHeight: 0,
          traceWidths: [0],
        },
        4: {
          id: 4,
          name: 'Noted',
          toggled: false,
          parentNode: 2,
          childNodes: [],
          trace: {
            height: 0,
            childHeights: [],
            childTraceWidths: []
          },

          traceHeight: 0,
          traceWidths: [],
        },
        5: {
          id: 5,
          name: 'Python',
          toggled: false,
          parentNode: 1,
          childNodes: [],
          trace: {
            height: 0,
            childHeights: [],
            childTraceWidths: []
          },

          traceHeight: 0,
          traceWidths: [],
        },
        6: {
          id: 6,
          name: 'Books',
          toggled: true,
          parentNode: 0,
          childNodes: [7,8],
          trace: {
            height: 0,
            childHeights: [0,0],
            childTraceWidths: [0,0]
          },

          traceHeight: 0,
          traceWidths: [0,0],
        },
        7: {
          id: 7,
          name: '1984',
          toggled: false,
          parentNode: 6,
          childNodes: [],
          trace: {
            childHeights: [],
            height: 0,
            childTraceWidths: []
          },

          traceHeight: 0,
          traceWidths: [],
        },
        8: {
          id: 8,
          name: 'Brave New World',
          toggled: false,
          parentNode: 6,
          childNodes: [],
          trace: {
            height: 0,
            childHeights: [],
            childTraceWidths: []
          },

          traceHeight: 0,
          traceWidths: [],
        },
        9: {
          id: 9,
          name: 'Another One',
          toggled: false,
          parentNode: 3,
          childNodes: [],
          trace: {
            height: 0,
            childHeights: [],
            childTraceWidths: []
          },

          traceHeight: 0,
          traceWidths: [],
        },
        10: {
          id: 10,
          name: 'WebDev',
          toggled: false,
          parentNode: 1,
          childNodes: [],
          trace: {
            height: 0,
            childHeights: [],
            childTraceWidths: []
          },

          traceHeight: 0,
          traceWidths: [],
        }
      },
      allIds: [0,1,2,3,4,5,6,7,8]
    }
  }
}

export default initialState;

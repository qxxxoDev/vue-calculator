export default [
  {
    content: 'AC',
    class: 'action clearAll'
  },
  {
    content: '<',
    class: 'action clearLast'
  },
  {
    class: 'operand',
    content: '%',
    parsed: '%'
  },
  {
    content: '/',
    class: 'operand',
    parsed: '/'
  },
  {
    content: '7',
    class: 'digit'
  },
  {
    content: '8',
    class: 'digit'
  },
  {
    content: '9',
    class: 'digit'
  },
  {
    content: 'x',
    class: 'operand',
    parsed: '*'
  },
  {
    content: '4',
    class: 'digit'
  },
  {
    content: '5',
    class: 'digit'
  },
  {
    content: '6',
    class: 'digit'
  },
  {
    content: '-',
    class: 'operand',
    parsed: '-'
  },
  {
    content: '1',
    class: 'digit'
  },
  {
    content: '2',
    class: 'digit'
  },
  {
    content: '3',
    class: 'digit'
  },
  {
    content: '+',
    class: 'operand',
    parsed: '+'
  },
  {
    content: ``,
    class: 'action link'
  },
  {
    content: '0',
    class: 'digit'
  },
  {
    content: ',',
    class: 'coma',
    parsed: '.'
  },
  {
    content: '=',
    class: 'equal',
    parsed: 'get'
  }
]
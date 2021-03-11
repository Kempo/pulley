import Cell from './Cell';

export default function Row(props) {
  return (
    <tr>
      {
        [...Array(props.table.length)].map((_, index) => (
          <Cell key={index} colNum={index} {...props} />
        ))
      }
    </tr>
  )
}
import Cell from './Cell';

// 5 input boxes
export default function Row(props) {

  return (
    <div>
      <Cell colNum={0} {...props} />
      <Cell colNum={1} {...props} />
      <Cell colNum={2} {...props} />
      <Cell colNum={3} {...props} />
      <Cell colNum={4} {...props} />
    </div>
  )
}
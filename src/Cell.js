// import { useState } from 'react';

export default function Cell({table, colNum, rowNum, onUpdate }) {

  // NOTE: not used since `onBlur` event isn't used. If we did, we'd
  // rethink a bit of how state is managed.
  // const [cellValue, setCellValue] = useState('');

  const handleBlur = (event) => {
    const value = event.target.value;

    onUpdate(colNum, rowNum, value);
  }

  /*
  const handleChange = (event) => {
    const value = event.target.value;

    setCellValue({
      cellValue: value
    })
  }
  */

  return (
      <td>
        <input value={table[rowNum][colNum]} onChange={handleBlur}></input> 
      </td>
    )
}
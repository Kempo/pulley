import { useState } from 'react';
import Row from './Row.js';
import './App.css';

// undo/redo
// keep track of row, column, text (list/array) -> onBlur
// keep track of state here useState

// dimensions of the spreadsheet
const DIMENSIONS = 5;

function App() {

  const [table, setTable] = useState(Array(DIMENSIONS).fill(Array(DIMENSIONS).fill('')));

  // contains all the changes (including current state) that the user has done (most recent is last element)
  const [undo, setUndone] = useState([]);

  // contains all changes that the user has undone (most recent is last element)
  const [redo, setRedone] = useState([]);

  const handleUndo = () => {
    // gets all the changes at the last cell that was modified
    const numToUndoAtCell = undo.length > 0 ? undo.filter(obj => obj.row === undo[undo.length - 1].row 
        && obj.col === undo[undo.length - 1].col) : [];

    if(numToUndoAtCell.length >= 2) {
      // what the most recent change was
      const last = numToUndoAtCell[numToUndoAtCell.length - 1];

      // the change to revert back to (which is the before the most recent)
      const toRevertTo = numToUndoAtCell[numToUndoAtCell.length - 2];

      // take out the most recent change
      setUndone([...undo.filter(change => change.col !== last.col || change.row !== last.row || change.value !== last.value)]);

      // add to the changes that you can redo
      setRedone([...redo, last]);

      // update table
      updateCell(toRevertTo.col, toRevertTo.row, toRevertTo.value);

    }else if(numToUndoAtCell.length === 1) {
      const toRevertTo = numToUndoAtCell[0];

      // updates the things to be undone by filtering out the recently undone change
      setUndone([...undo.filter(change => change.col !== toRevertTo.col || change.row !== toRevertTo.row || change.value !== toRevertTo.value)]);
      setRedone([...redo, toRevertTo]);

      updateCell(toRevertTo.col, toRevertTo.row, '');
    }
  }

  const handleRedo = () => {
    if(redo.length > 0) {
      // take most recently added item that should be redone
      const changeToRedo = redo[redo.length - 1];

      // reupdate the cell
      updateCell(changeToRedo.col, changeToRedo.row, changeToRedo.value);

      // add back to undo list
      setUndone([...undo, changeToRedo]);

      // shorten redo list by 1
      setRedone([...redo.slice(0, redo.length - 1)]);
    }
  }

  const handleTableChange = (cellCol, cellRow, value) => {
    updateCell(cellCol, cellRow, value);

    const change = { col: cellCol, row: cellRow, value };

    setUndone([...undo, change]);
  }

  const updateCell = (cellCol, cellRow, value) => {
    // TODO: make this better (ie. don't require copying of entire table)
    const updated = table.map((row, rowIndex) => {
      if(rowIndex === cellRow) {
        return row.map((col, colIndex) => {
          return colIndex === cellCol ? value : col;
        });
      }else{
        return row;
      }
    })

    setTable(updated);
  }

  return (
    <div className="App">
      <p>Undo/Redo Spreadsheet</p>
      <table>
        <tbody>
          {
            table.map((_, index) => 
              <Row key={index} rowNum={index} table={table} onUpdate={handleTableChange} />
            )
          } 
        </tbody>
      </table>
      <div>
        <button onClick={handleUndo} disabled={undo.length === 0}>Undo</button>
        <button onClick={handleRedo} disabled={redo.length === 0}>Redo</button>
      </div>
    </div>
  );
}

export default App;

import { useRef } from 'react';
import './TaskInput.scss'

export default function TaskInput({ items, setItems, isEditing }) {
  const inputRef = useRef();
  const addBtnRef = useRef();

  const handleAdd = () => {
    const input = inputRef.current;
    const value = input.value;

    if (value === '') {
      input.focus();
      return;
    }

    setItems([...items, { id: Date.now(), value, isEditing: false, isChecked: false }]);
    input.value = '';
    input.focus();
  };

  return (
    <form id="form" onSubmit={e => e.preventDefault()}>
      <label htmlFor="task-input">task: </label>
      <input type="text" id="task-input" name="task-input" autoFocus disabled={isEditing} ref={inputRef} />
      <button id="add-btn" disabled={isEditing} ref={addBtnRef} onClick={handleAdd}>add</button>
    </form>
  );
}


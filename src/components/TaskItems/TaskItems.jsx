import { useRef, useEffect } from 'react';
import './TaskItems.scss';

export default function TaskItem({ items, setItems, isEditing, setIsEditing }) {
  const textareaRefs = useRef({});

  const handleCheck = taskId => {
    setItems(prevItems => prevItems.map(item => item.id === taskId ? { ...item, isChecked: !item.isChecked } : item));
  };

  const handleEdit = taskId => {
    setItems(prevItems => prevItems.map(item => item.id === taskId ? { ...item, isEditing: true } : item));
    setIsEditing(true);
  };

  useEffect(() => {
    const editingItem = items.find(item => item.isEditing);
    if (editingItem && textareaRefs.current[editingItem.id]) {
      textareaRefs.current[editingItem.id].select();
    }
  }, [items]);

  const handleBlur = (event, taskId) => {
    setItems(prevItems => prevItems.map(item => item.id === taskId ? { ...item, value: event.target.value, isEditing: false } : item));

    setTimeout(() => {
      setIsEditing(false);
      getSelection().removeAllRanges();
    }, 300);
  };

  const handleDelete = taskId => {
    setItems(prevItems => prevItems.filter(item => item.id !== taskId));
  };

  return (
    <ol id="list">
      {items.map(item => (
        <li key={item.id} data-check={item.isChecked ? "checked" : ""}>
          <div>
            {item.isEditing ? (
              <textarea defaultValue={item.value}
                ref={el => (textareaRefs.current[item.id] = el)} onBlur={e => handleBlur(e, item.id)} />
            ) : (
              <textarea defaultValue={item.value}
                readOnly disabled />
            )}
            <div className="item-action-container">
              <input type="checkbox" name="item-action-check" className="item-action item-action-check"
                checked={item.isChecked} disabled={isEditing} onChange={() => handleCheck(item.id)} />
              <button className="item-action item-action-edit" disabled={isEditing} onClick={() => handleEdit(item.id)}>edit</button>
              <button className="item-action item-action-delete" disabled={isEditing} onClick={() => handleDelete(item.id)}>delete</button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}


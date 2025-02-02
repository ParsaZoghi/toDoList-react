// imports
import { useState } from 'react';

import TaskInput from "../../components/TaskInput/TaskInput";
import ListButtons from "../../components/ListButtons/ListButtons";
import TaskItems from "../../components/TaskItems/TaskItems";

import './App.scss';

function App() {
  // expressions
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {/* html */}
      <h1>To Do List</h1>
      <section id="task">
        <TaskInput items={items} setItems={setItems} isEditing={isEditing} setIsEditing={setIsEditing} />
        <ListButtons items={items} setItems={setItems} isEditing={isEditing} setIsEditing={setIsEditing} />
      </section>
      <TaskItems items={items} setItems={setItems} isEditing={isEditing} setIsEditing={setIsEditing} />
    </>
  );
}

export default App;


import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ todo: "", active: false });

  const  changeActive = (e) => {
      const newList =  todoList.map((a, i) => {
          console.log('hola:', a)
        return i.toString() === e.target.id ? { ...a, active: !a.active } : a;
      })
    setTodoList(newList)
  }

  useEffect(()=>{
    console.log('changed')
  }, [todoList])

  const stylingFalse = {
    textDecoration: "line-through",
    color: 'gray',
    fontStyle: 'italic'
  };

  const stylingTrue = {
    textDecoration: "none",
    color: "black"
  };

  console.log(todo);
  console.log(todoList);

  return (
    <div>
      <h2>To Do</h2>
      <form>
        {todoList.length > 0
          ? todoList.map((t, index) => {
              return (
                <div key={index}>
                  <input
                    id = {index}
                    type="checkbox"
                    name={t.todo}
                    checked = {!t.active}
                    onChange={(e) =>
                      changeActive(e)
                    }
                  />
                  <label style={!t.active ? stylingFalse : stylingTrue}>
                    {t.todo}
                  </label>
                </div>
              );
            })
          : "Nothing to do.."}
      </form>
      <form
        style={{ marginTop: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          setTodoList([...todoList, { todo: todo.todo, active: true }]);
          setTodo({ todo: "", active: false });
        }}
        onReset={()=>{
            setTodoList([])
            setTodo({ todo: "", active: false })
        }}
      >
        <label>To Do: </label>
        <br />
        <input
          type="text"
          name="todo"
          value={todo.todo}
          onChange={(e) => {
            setTodo({ todo: e.target.value, active: false });
          }}
        />
        <button type="submit">Add</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};

export default Todo;

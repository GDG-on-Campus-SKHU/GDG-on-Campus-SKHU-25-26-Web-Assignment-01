import React, { useState } from 'react';

// Todo 아이템의 타입 정의
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// App 컴포넌트
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 스타일을 위한 CSS 코드
  const styles = `
    .container {
      min-height: 100vh;
      background-color: #f7fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
    }
    .card {
      width: 100%;
      max-width: 28rem; /* 448px */
      background-color: white;
      border-radius: 0.5rem; /* 8px */
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 2rem; /* 32px */
    }
    .title {
      font-size: 2.25rem; /* 36px */
      font-weight: bold;
      text-align: center;
      color: #2d3748;
      margin-bottom: 1.5rem; /* 24px */
    }
    .input-group {
      display: flex;
      margin-bottom: 1.5rem; /* 24px */
    }
    .input {
      flex-grow: 1;
      border: 2px solid #e2e8f0;
      border-radius: 0.375rem 0 0 0.375rem; /* 6px */
      padding: 0.75rem; /* 12px */
      outline: none;
    }
    .input:focus {
      border-color: #4299e1;
    }
    .button {
      background-color: #4299e1;
      color: white;
      font-weight: 600;
      padding: 0 1.5rem; /* 24px */
      border-radius: 0 0.375rem 0.375rem 0;
      border: none;
      cursor: pointer;
    }
    .button:hover {
      background-color: #3182ce;
    }
    .todo-list {
      list-style-type: none; 
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem; /* 12px */
    }
    .todo-item {
      display: flex;
      align-items: center;
      background-color: #f7fafc;
      padding: 0.75rem; /* 12px */
      border-radius: 0.375rem; /* 6px */
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .todo-text {
      flex-grow: 1;
      margin: 0 1rem; /* 16px */
      color: #4a5568;
    }
    .todo-text.completed {
      text-decoration: line-through;
      color: #a0aec0;
    }
    .delete-button {
      background-color: #f56565;
      color: white;
      font-size: 0.75rem; /* 12px */
      font-weight: bold;
      padding: 0.25rem 0.5rem; /* 4px 8px */
      border-radius: 0.25rem; /* 4px */
      border: none;
      cursor: pointer;
    }
    .delete-button:hover {
      background-color: #e53e3e;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="card">
          <h1 className="title">Todo List</h1>

          <div className="input-group">
            <input
              type="text"
              className="input"
              placeholder="새로운 할 일을 입력하세요..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <button onClick={handleAddTodo} className="button">
              추가
            </button>
          </div>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-button"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;

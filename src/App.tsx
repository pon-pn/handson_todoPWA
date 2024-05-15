import { useState } from 'react'
import './App.css'

// "Todo型" の定義
type Todo = {
  // プロパティ value は文字列型
  value: string;
  readonly id: number;
};

export const App = () => {
  // 初期値: 空文字列
  const [text, setText] = useState('');
  // 更新後のステートが更新前のステートの値に依存している場合には、setState メソッドには値ではなく関数を渡すべき
  const [todos, setTodos] = useState<Todo[]>([]);

  // todosステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if(!text) return;

    // 新たなTODOを作成
    // 明示的に型注釈をつけてオブジェクトの型を限定する
    const newTodo : Todo = {
      value: text,
      id: new Date().getTime(),
    };

    // 更新前のステートの値を元に新ステートを生成
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  }

  // textステートが持っている入力中のテキストをvalueとして表示
  // onChangeをtextステートに反映する（targetは参照）
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <div>
      {/* e.preventDefault() Enter キー打鍵でページそのものがリロードされてしまうのを防ぐため */}
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' value={text} onChange={(e) => handleChange(e)}/>
        <input type="submit" value="追加" onClick={handleSubmit} />
      </form>

      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.value}</li>
        })}
      </ul>
    </div>
  )
};

import { useState } from 'react'
import './App.css'

// "Todo型" の定義
type Todo = {
  // プロパティ value は文字列型
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const App = () => {
  // 初期値: 空文字列
  const [text, setText] = useState('');
  // 更新後のステートが更新前のステートの値に依存している場合には、setState メソッドには値ではなく関数を渡すべき
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // todosステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新たなTODOを作成
    // 明示的に型注釈をつけてオブジェクトの型を限定する
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    // 更新前のステートの値を元に新ステートを生成
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  }

  // textステートが持っている入力中のテキストをvalueとして表示
  // onChangeをtextステートに反映する（targetは参照）
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  // V extends Todo[K] => todo.id, todo.value, todo.checked, todo.removed のいずれかの値
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value }
        } else {
          return todo
        }
      })
      return newTodos;
    })
  };

  // // 編集用のコールバック関数
  // const handleEdit = (id: number, value: string) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         // todoをコピー展開＋valueを引数で上書き
  //         return { ...todo, value: value }
  //         // todo.value = value;
  //       }
  //       return todo;
  //     });
  //     return newTodos;
  //   })
  // }

  // const handleCheck = (id: number, checked: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, checked };
  //       }
  //       return todo;
  //     })
  //     return newTodos;
  //   })
  // }

  // const handleRemoved = (id: number, removed: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, removed };
  //       }
  //       return todo;
  //     })
  //     return newTodos;
  //   })
  // }

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  })

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  }

  return (
    <div>
      <select defaultValue="all" onChange={(e) => handleSort(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === 'removed' ? (
        <button onClick={handleEmpty} disabled={todos.filter((todo) => todo.removed).length === 0}>ゴミ箱を空にする</button>
      ) : (
        filter !== 'checked' && (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <input type='text' value={text} onChange={(e) => handleChange(e)} />
            <input type="submit" value="追加" onClick={handleSubmit} />
          </form>
        )
      )}

      <ul>
        {filteredTodos.map((todo) => {
          return <li key={todo.id}>{todo.value}
            {/* 呼び出し側でcheckedフラグを反転させる */}
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => handleTodo(todo.id, `checked`, !todo.checked)}
            />
            <input
              type='text'
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => handleTodo(todo.id, `value`, e.target.value)} />
            <button onClick={() => handleTodo(todo.id, `removed`, !todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
          </li>
        })}
      </ul>
    </div >
  )
};

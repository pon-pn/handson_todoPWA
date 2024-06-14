import { useEffect, useState } from 'react'
import './App.css'
import { FormDialog } from './FormDialog';
import { ActionButton } from './ActionButton';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { ToolBar } from './ToolBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';
import { GlobalStyles } from '@mui/material';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
// localforage をインポート
import localforage from 'localforage';
import { isTodos } from './lib/isTodos';



export const App = () => {
  // 初期値: 空文字列
  const [text, setText] = useState('');
  // 更新後のステートが更新前のステートの値に依存している場合には、setState メソッドには値ではなく関数を渡すべき
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // todosステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen);
      return
    }

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

    setDialogOpen((dialogOpen) => !dialogOpen);
  }

  // textステートが持っている入力中のテキストをvalueとして表示
  // onChangeをtextステートに反映する（targetは参照）
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  }

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[500],
        light: '#757de8',
        dark: '#002984'
      },
      secondary: {
        main: pink[500],
        light: '#ff6090',
        dark: '#b0003a',
      },
    }
  });

  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  }

  const handleToggleQR = () => {
    setQrOpen((qrOpen) => !qrOpen)
  }

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setText("");
  }

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  }

  useEffect(() => {
    localforage
      .getItem('todo-20200101')
      .then((values) => isTodos(values) && setTodos(values as Todo[]));
  }, []);

  useEffect(() => {
    localforage.setItem("todo-20200101", todos);
  }, [todos])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleToggleDrawer}
        onToggleQR={handleToggleQR}
        onSort={handleSort}
      />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog} />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={handleToggleAlert}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider >
  )
};

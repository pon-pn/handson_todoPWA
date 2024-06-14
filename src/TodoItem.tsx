import { styled } from "@mui/material";

type Props = {
  todos: Todo[];
  filter: Filter;
  onTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
}

const Container = styled("div")({
  margin: "o auto",
  maxWidth: "640px",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
})

export const TodoItem = (props: Props) => {
  const filteredTodos = props.todos.filter((todo) => {
    switch (props.filter) {
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

  return (
    <Container>
      {filteredTodos.map((todo) => {
        return <li key={todo.id}>{todo.value}
          {/* 呼び出し側でcheckedフラグを反転させる */}
          <input
            type="checkbox"
            disabled={todo.removed}
            checked={todo.checked}
            onChange={() => props.onTodo(todo.id, `checked`, !todo.checked)}
          />
          <input
            type='text'
            disabled={todo.checked || todo.removed}
            value={todo.value}
            onChange={(e) => props.onTodo(todo.id, `value`, e.target.value)} />
          <button onClick={() => props.onTodo(todo.id, `removed`, !todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
        </li>
      })}
    </Container>
  )
}
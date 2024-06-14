type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleDialog: () => void;
}

export const FormDialog = (props: Props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}>
    <input type="text" value={props.text} onChange={(e) => props.onChange(e)} />
    <input type="submit" value="追加" onSubmit={props.onSubmit} />
  </form>
);
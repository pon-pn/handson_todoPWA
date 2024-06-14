import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// 絶対パスでインポートすることにより不要なモジュールの読み込みを避けるためビルド速度が上がるらしい
import { Icon } from '@mui/material';

type Props = {
  filter: Filter;
  onToggleDrawer: () => void;
}

const translater = (arg: Filter) => {
  switch (arg) {
    case 'all':
      return 'すべてのタスク';
    case 'unchecked':
      return '現在のタスク';
    case 'checked':
      return '完了したタスク';
    case 'removed':
      return 'ゴミ箱';
    default:
      return 'TODO';
  }
}

export const ToolBar = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu-button"
            sx={{ mr: 2 }}
            onClick={props.onToggleDrawer}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography>{translater(props.filter)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
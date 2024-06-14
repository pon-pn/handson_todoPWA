// "Todo型" の定義
declare type Todo = {
  // プロパティ value は文字列型
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};
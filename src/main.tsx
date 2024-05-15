import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {App} from './App'
import './index.css'

// createRootメソッドを用いて、<div id="root"> という要素を取得しReactのルートとする
// Element型としてアサーションしている
// DOM上にid rootが設定されていない場合nullを返すが、createRootの引数にnullは存在しないためas Elementを設定
const root = createRoot(document.getElementById("root") as Element);

// DOM 内部へ<App />コンポーネントをレンダリングしている
root.render (
  <StrictMode>
    <App />
  </StrictMode>
)


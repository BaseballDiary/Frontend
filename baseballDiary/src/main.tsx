// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // 만약 global style이 필요하다면
import '../styles.css'
import '../output.css'; // 또는 상대 경로에 맞게 작성


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
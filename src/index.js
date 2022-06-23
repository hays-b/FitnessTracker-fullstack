import ReactDOM from 'react-dom/client'
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from './components/AuthProvider'
import './style/index.css'

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
 
import './App.css' 
import { AuthProvider } from './Context/AuthContext';
import { AppRouter } from './MyRoutes/AppRoutes';

function App() {

  return (
    < AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App

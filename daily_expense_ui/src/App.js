import './App.css';
import SignUp from './components/SignUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddExpense from './components/AddExpense';
import GetExpense from './components/GetExpense';
import ExpenseAmount from './components/ExpenseAmount';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import LogoutButton from './components/LogoutButton';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/add-expense' element={<AddExpense/>} />
        <Route exact path='/user-expenses' element={<GetExpense/>} />
        <Route exact path='/expense-amount' element={<ExpenseAmount/>} />
        <Route exact path='/forgot-password' element={<ForgotPassword/>} />
        <Route exact path='/reset-password/:requestId' element={<ResetPassword/>} />
        <Route exact path='/logout' element={<LogoutButton/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

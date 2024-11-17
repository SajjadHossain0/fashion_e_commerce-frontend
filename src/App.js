import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/HomePage";
import AdminPage from "./components/Admin/AdminPage";

function App() {
  return (
    <div className="App">
        <AdminPage/>
        {/*<HomePage />*/}
        {/*<Footer />*/}
    </div>
  );
}

export default App;

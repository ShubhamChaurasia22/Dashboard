import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import "./App.css";

function App() {
  
  return (
    <>
      <div className="dashboard-container">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;

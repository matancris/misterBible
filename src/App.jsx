import './App.css';
import AppHeader from './cmps/AppHeader';
import BibleApp from './pages/BibleApp';

function App() {
  return (
    <section className="App">
      <AppHeader />
      <main className="app-main">
        <BibleApp />
      </main>


    </section>
  );
}

export default App;

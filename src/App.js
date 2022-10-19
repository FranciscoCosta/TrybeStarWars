import './App.css';
import Filters from './Components/Filters';
import Table from './Components/Table';
import Provider from './Context/Context';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;

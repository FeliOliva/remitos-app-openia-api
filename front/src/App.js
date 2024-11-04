import './App.css';
import TablesCuentasCorrientes from './components/TablesCuentasCorrientes';
import Chat from './components/Chat';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
        <TablesCuentasCorrientes />
        <Chat />
      </DataProvider>
    </div>
  );
}

export default App;

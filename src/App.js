import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';

function App() {
  return (
    <div className="App">
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/create-room' element={<CreateRoom />} />
			<Route path='/room/:roomId' element={<Room />} />
			<Route path='/join-room' element={<JoinRoom />} />
		</Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';
import RoomV2 from './v2/pages/Room';
import HomeV2 from './v2/pages/Home';
import Menu from './v2/pages/Menu';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<HomeV2 />} />
				<Route path='/room/:roomId' element={<RoomV2 />} />
				<Route path='/menu/' element={<Menu />} />
			</Routes>
		</div>
	);
}

export default App;

import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='page home'>
            <div className='board'>
                <div className='tile naught invert'>T</div>
                <div className='tile naught invert'>I</div>
                <div className='tile naught invert'>C</div>
                <div className='tile neutral invert'>T</div>
                <div className='tile neutral invert'>A</div>
                <div className='tile neutral invert'>C</div>
                <div className='tile cross invert'>T</div>
                <div className='tile cross invert'>O</div>
                <div className='tile cross invert'>E</div>
                <div className="row-1"></div>
                <div className="row-2"></div>
                <div className="col-1"></div>
                <div className="col-2"></div>
            </div>
            <div className='btn-container'>
                <button
                    className='btn'
                    onClick={() => {
                        navigate(`/create-room`)
                    }}
                >
                    {/* <CircleOutlinedIcon />  */}
                    Create Room
                </button>
                <button
                    className='btn'
                    onClick={() => {
                        navigate('/join-room')
                    }}
                >
                    {/* <CircleOutlinedIcon />  */}
                    Join Room
                </button>
            </div>
        </div>
    )
}

export default Home
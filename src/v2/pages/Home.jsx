import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import X from '../components/X';
import O from '../components/O';

const Home = () => {
    const navigate = useNavigate();
    const [randomChoice, setRandomChoice] = useState(null);
    const [playClicked, setPlayClicked] = useState(false);

    useEffect(() => {
        setInterval(() => {
            const newChoice = Math.floor(Math.random() * 9);
            setRandomChoice(newChoice);
            setTimeout(() => { setRandomChoice(null) }, 1100)
        }, 4000)
    }, [])

    return (
        <div className='page home'>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className='board'>
                    <div className='tile cross'> {randomChoice === 0 && <X isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 0 && "visible"}>T</span></div>
                    <div className='tile naught'> {randomChoice === 1 && <O isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 1 && "visible"}>I</span></div>
                    <div className='tile cross'> {randomChoice === 2 && <X isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 2 && "visible"}>C</span></div>
                    <div className='tile naught'> {randomChoice === 3 && <O isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 3 && "visible"}>T</span></div>
                    <div className='tile cross'> {randomChoice === 4 && <X isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 4 && "visible"}>A</span></div>
                    <div className='tile naught'> {randomChoice === 5 && <O isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 5 && "visible"}>C</span></div>
                    <div className='tile cross'> {randomChoice === 6 && <X isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 6 && "visible"}>T</span></div>
                    <div className='tile naught'> {randomChoice === 7 && <O isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 7 && "visible"}>O</span></div>
                    <div className='tile cross'> {randomChoice === 8 && <X isAnimated={true} direction={"both"} isVisible={true} />} <span className={randomChoice !== 8 && "visible"}>E</span></div>
                    <div className="row-1"></div>
                    <div className="row-2"></div>
                    <div className="col-1"></div>
                    <div className="col-2"></div>
                </div>

                <div className='board' style={{ position: 'absolute', display: playClicked ? "grid" : "none" }}>
                    <div className="row-1 active"></div>
                    <div className="row-2 active"></div>
                    <div className="col-1 active"></div>
                    <div className="col-2 active"></div>
                </div>
            </div>
            <div className='btn-container'>
                <button
                    className='btn'
                    onClick={() => {
                        setPlayClicked(true);
                        setTimeout(() => { navigate(`/menu`) }, 1000);
                    }}
                >
                    PLAY
                </button>
            </div>
        </div>
    )
}

export default Home
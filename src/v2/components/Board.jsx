import React, { useEffect } from 'react'
import X from './X'
import O from './O'

const Board = ({ ticTacToe, drawAnimations, onClick, isActive, delayAnimationsBy, showHover }) => {
    const style = {
        animationDelay: delayAnimationsBy
    }

    useEffect(() => { console.log(ticTacToe) }, [ticTacToe])

    return (
        <div className='board-container'>
            <div className='board'>
                {
                    (Array.from(ticTacToe.board)).map((cell, i) => (
                        <div
                            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
                            onClick={() => {
                                if (onClick) {
                                    onClick(Math.floor(i / 3), i % 3)
                                }
                            }}
                        >
                            {/* {cell} */}
                            {
                                cell == 'X' &&
                                <X isAnimated={drawAnimations} isVisible={true} />
                            }
                            {
                                cell == 'O' &&
                                <O isAnimated={drawAnimations} isVisible={true} />
                            }
                            {
                                showHover &&
                                (
                                    ((cell == "#" && ticTacToe.turn % 2 === 0) ||
                                        (cell == 'X')) &&
                                    <X isAnimated={drawAnimations} isVisible={false} />
                                )
                            }
                            {
                                showHover &&
                                (
                                    ((cell == "#" && ticTacToe.turn % 2 === 1) ||
                                        (cell == 'O')) &&
                                    <O isAnimated={drawAnimations} isVisible={false} />
                                )
                            }
                        </div>
                    ))
                }
                <div className="row-1" style={style}></div>
                <div className="row-2" style={style}></div>
                <div className="col-1" style={style}></div>
                <div className="col-2" style={style}></div>

                {
                    isActive && (
                        <>
                            <div style={style} className="row-1 active"></div>
                            <div style={style} className="row-2 active"></div>
                            <div style={style} className="col-1 active"></div>
                            <div style={style} className="col-2 active"></div>
                        </>
                    )
                }
            </div>
            {
                ticTacToe?.hasEnded() &&
                <>
                    <div className="result-state row">
                        <div></div>
                        <div>
                            {
                                ticTacToe?.result.state.has(0) &&
                                <div className={`rs rs-0`}></div>
                            }
                        </div>
                        <div></div>
                        <div>
                            {
                                ticTacToe?.result.state.has(1) &&
                                <div className={`rs rs-1`}></div>
                            }
                        </div>
                        <div></div>
                        <div>
                            {
                                ticTacToe?.result.state.has(2) &&
                                <div className={`rs rs-2`}></div>
                            }
                        </div>
                        <div></div>
                    </div>
                    <div className="result-state col">
                        <div></div>
                        <div>
                            {
                                ticTacToe?.result.state.has(3) &&
                                <div className={`rs rs-3`}></div>
                            }
                        </div>
                        <div></div>
                        <div>
                            {
                                ticTacToe?.result.state.has(4) &&
                                <div className={`rs rs-4`}></div>
                            }
                        </div>
                        <div></div>
                        <div>
                            {
                                ticTacToe?.result.state.has(5) &&
                                <div className={`rs rs-5`}></div>
                            }
                        </div>
                        <div></div>
                    </div>

                    <div className="result-state dia">
                        {
                            ticTacToe?.result.state.has(6) &&
                            <div className={`rs rs-6`}></div>
                        }
                        {
                            ticTacToe?.result.state.has(7) &&
                            <div className={`rs rs-7`}></div>
                        }
                    </div>
                </>
            }
        </div >
    )
}

export default Board
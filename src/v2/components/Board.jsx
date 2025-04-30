import React from 'react'
import X from './X'
import O from './O'

const Board = ({ ticTacToe, drawAnimations, onClick, isActive, delayAnimationsBy, showHover }) => {
    const style = {
        animationDelay: delayAnimationsBy
    }

    return (
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
    )
}

export default Board
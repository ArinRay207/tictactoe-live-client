import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import O from '../components/O';
import X from '../components/X';
import Board from '../components/Board';
import { TicTacToe } from '../../TicTacToe';
import useSocket from '../hooks/useSocket';
import { eventTypes } from '../constants/eventTypes';

import styles from './Room.module.css'
import { N } from '../constants/constants.js';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';

const Room = () => {
	const { roomId } = useParams();
	const [room, setRoom] = useState();
	const [ticTacToe, setTicTacToe] = useState(new TicTacToe());
	const [firstTurn, setFirstTurn] = useState(null);
	const [myPlayer, setMyPlayer] = useState(null);
	const [isCopyClicked, setIsCopyCLicked] = useState(false);
	const [isCopyLinkClicked, setIsCopyLinkCLicked] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const socket = useSocket();

	useEffect(() => {
		if (socket) {
			const username = searchParams.get("username");
			socket.send(JSON.stringify({ type: eventTypes.JOIN, payload: { username, roomId } }))

			socket.onmessage = (event) => {
				const { type, payload } = JSON.parse((event.data));

				switch (type) {
					case eventTypes.UPDATE_ROOM:
						setRoom(payload.room);
						if (payload.player) {
							setMyPlayer(payload.player);
						}
						if (payload.round && payload.round !== null) {
							setFirstTurn(payload.round.firstTurn);
							setTicTacToe(new TicTacToe(payload.round.game.board));
						}
						break;

					case eventTypes.START:
						setFirstTurn(payload.firstTurn);
						setTicTacToe(new TicTacToe(payload.game.board));
						break;

					case eventTypes.MOVE:
						setTicTacToe(new TicTacToe(payload.game.board));
						break;

					case eventTypes.ERROR:
						alert(JSON.stringify(payload.message))
				}
			};
		}
	}, [socket])

	if (!socket) {
		return <div></div>
	}

	const handleClick = (x, y) => {
		if (isMyTurn())
			socket.send(JSON.stringify({ type: eventTypes.MOVE, payload: { roomId: roomId, move: { to: { x, y } } } }))
	}

	const handleStart = () => {
		socket.send(JSON.stringify({ type: eventTypes.START, payload: { roomId } }))
	}

	const isTurn = (id) => {
		return ((ticTacToe.turn + firstTurn) % N) === id;
	}

	const isMyTurn = () => {
		return ((ticTacToe.turn + firstTurn) % N) === myPlayer?.id;
	}

	const handleCopy = async () => {
		await navigator.clipboard.writeText(roomId);
		setIsCopyCLicked(true);
		setTimeout(() => setIsCopyCLicked(false), 2000);
	}

	const handleCopyLink = async () => {
		// TODO CONSTRUCT LINK HERE
		setIsCopyCLicked(true);
		setTimeout(() => setIsCopyCLicked(false), 2000);
	}

	return (
		<div className={`page ${styles['room']}`}>
			<div className={styles['room-id']}>
				<span>ROOM ID: {roomId}</span>
				{isCopyClicked === false ? <ContentCopyIcon className={`${styles['icon']}`} onClick={handleCopy} /> : <CheckIcon className={`${styles['icon']}`} onClick={handleCopy} />}
			</div>
			<div className={`${styles['game-container']}`}>
				<div className={`${styles['username-container']} ${styles['left']} ${isTurn((room?.players[0])?.id) && styles['current']}`}>
					{
						room?.players?.length > 0 &&
						<>
							{
								firstTurn !== null &&
								<div className={`${styles['piece']}`}>
									{
										firstTurn === 0 ? (
											<X isVisible={true} />
										) : (
											<O isVisible={true} />
										)
									}
								</div>
							}
							<div className={`${styles['user-name']}`}>
								{room?.players[0]?.isConnected && room?.players[0]?.username}
							</div>
							{
								firstTurn !== null &&
								<div className={`${styles['score']}`}>
									{room?.players[0]?.score}
								</div>
							}
						</>
					}
				</div>
				<div className={`${styles['middle-container']} ${firstTurn === null ? styles['inactive'] : styles['active']}`}>
					<span>vs</span>
					<div>
						<Board isActive={firstTurn !== null} drawAnimations={true} delayAnimationsBy={'0.9s'} ticTacToe={ticTacToe} onClick={handleClick} showHover={isMyTurn()} />
					</div>
				</div>
				<div className={`${styles['username-container']} ${styles['right']} ${isTurn((room?.players[1])?.id) && styles['current']}`}>
					{
						room?.players.length > 1 ?
							(
								<>

									{
										firstTurn !== null &&
										<div className={`${styles['piece']}`}>
											{
												firstTurn === 0 ? (
													<O isVisible={true} />
												) : (
													<X isVisible={true} />
												)
											}
										</div>
									}

									<div className={`${styles['user-name']} ${isTurn((room.players[1]).id) && styles['current']}`}>
										{(room?.players[1]?.isConnected ? room?.players[1]?.username : "...")}
									</div>
									{
										firstTurn !== null &&
										<div className={`${styles['score']}`}>
											{room?.players[1]?.score}
										</div>
									}
								</>
							)
							:
							(
								<div className={`${styles['user-name']}`}>
									...
								</div>
							)
					}

				</div>
			</div>
			<div className={`${styles['btn-container']}`}>
				{
					firstTurn === null &&
					<button
						className={`btn`}
						onClick={handleStart}
					>
						START
					</button>
				}

				{
					ticTacToe.hasEnded() &&
					<button
						className={`btn`}
						onClick={handleStart}
					>
						RESTART
					</button>
				}
			</div>
		</div>
	)
}

export default Room;
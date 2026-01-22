import React, { useEffect, useRef, useState } from "react";

import "./App.css";

import IconDisplay from "./components/IconDisplay";
import Clock from "./components/Clock";
import TaskBarAppDisplay from "./components/TaskBarAppDisplay";
import Volume from "./components/Volume";
import Clippy from "./components/Clippy";

import Terminal from "./apps/Terminal/Terminal";
import Txt from "./apps/Txt/Txt";
import MyPc from "./apps/MyPc/MyPc";
import Doom from "./apps/Doom/Doom";
import Paint from "./apps/Paint/Paint";

import { useAppsManager } from "./context/AppsManagerContext";
import { usePopUpsManager } from "./context/PopUpsManagerContext";
import Browser from "./apps/Browser/Browser";
import useIsMobile from "./hooks/useIsMobile";

const DESKTOP_WIDTH = 800;
const DESKTOP_HEIGHT = 600;
const TASKBAR_HEIGHT = 38;

function App() {
	const isMobile = useIsMobile();
	const { openedApps } = useAppsManager();
	const { openedPopUps } = usePopUpsManager();

	const appsDisplayParentRef = useRef(null);
	const appsTaskBarParentRef = useRef(null);
	const mobilePopUpsContainerRef = useRef(null);

	const terminalRef = useRef(null);
	const txtRef = useRef(null);
	const myPcRef = useRef(null);
	const doomRef = useRef(null);
	const computerScreenRef = useRef(null);
	const browserRef = useRef(null);
	const paintRef = useRef(null);

	// Estados dos apps
	const [isTerminalOpened, setIsTerminalOpened] = useState(false);
	const [isTxtOpened, setIsTxtOpened] = useState(false);
	const [isMyPcOpened, setIsMyPcOpened] = useState(false);
	const [isScreenTurnedOn, setIsScreenTurnedOn] = useState(false);
	const [isDoomOpened, setIsDoomOpened] = useState(false);
	const [isBrowserOpened, setIsBrowserOpened] = useState(false);
	const [isPaintOpened, setIsPaintOpened] = useState(false);

	// Calcular dimensões dinâmicas para mobile
	const [mobileDimensions, setMobileDimensions] = useState({ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT });

	useEffect(() => {
		if (!isMobile || isScreenTurnedOn) {
			setMobileDimensions({ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT });
			return;
		}

		const updateDimensions = () => {
			if (computerScreenRef.current) {
				const rect = computerScreenRef.current.getBoundingClientRect();
				if (rect.width > 0 && rect.height > 0) {
					setMobileDimensions({
						width: rect.width,
						height: rect.height - TASKBAR_HEIGHT, // Subtrair altura da taskbar
					});
				}
			}
		};

		// Aguardar múltiplos frames para garantir que o layout foi renderizado
		const timeout1 = setTimeout(updateDimensions, 0);
		const timeout2 = setTimeout(updateDimensions, 100);
		const raf1 = requestAnimationFrame(updateDimensions);
		const raf2 = requestAnimationFrame(() => {
			requestAnimationFrame(updateDimensions);
		});

		window.addEventListener("resize", updateDimensions);
		window.addEventListener("orientationchange", updateDimensions);

		return () => {
			clearTimeout(timeout1);
			clearTimeout(timeout2);
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
			window.removeEventListener("resize", updateDimensions);
			window.removeEventListener("orientationchange", updateDimensions);
		};
	}, [isMobile, isScreenTurnedOn]);

	// Usar dimensões dinâmicas no mobile, fixas no desktop
	const currentWidth = isMobile ? mobileDimensions.width : DESKTOP_WIDTH;
	const currentHeight = isMobile ? mobileDimensions.height : DESKTOP_HEIGHT;

	const appsStateMap = {
		terminal: { ref: terminalRef, isOpened: isTerminalOpened, setIsOpened: setIsTerminalOpened },
		txt: { ref: txtRef, isOpened: isTxtOpened, setIsOpened: setIsTxtOpened },
		mypc: { ref: myPcRef, isOpened: isMyPcOpened, setIsOpened: setIsMyPcOpened },
		doom: { ref: doomRef, isOpened: isDoomOpened, setIsOpened: setIsDoomOpened },
		browser: { ref: browserRef, isOpened: isBrowserOpened, setIsOpened: setIsBrowserOpened },
		paint: { ref: paintRef, isOpened: isPaintOpened, setIsOpened: setIsPaintOpened },
	};

	useEffect(() => {
		const registeredStateListeners = [];

		// Aguardar um frame para garantir que os refs estejam prontos
		const timeout = setTimeout(() => {
			for (const [key, { ref, setIsOpened }] of Object.entries(appsStateMap)) {
				if (ref?.current) {
					registeredStateListeners.push(
						ref.current.onAppCoreOpenStateChanged((isOpened) => {
							setIsOpened(isOpened);
						})
					);
				}
			}
		}, 0);

		return () => {
			clearTimeout(timeout);
			registeredStateListeners.forEach((removeListener) => removeListener());
		};
	}, [terminalRef, txtRef, myPcRef, doomRef, isScreenTurnedOn, browserRef, paintRef, isMobile]);

	useEffect(() => {
		function onClick({ x, y }) {
			if (!computerScreenRef.current) {
				return;
			}

			const { top, left, width, height } = computerScreenRef.current.getBoundingClientRect();

			if (x >= left && x <= left + width && y >= top && y <= top + height) {
				const sound = new Audio("icons/click.mp3");
				sound.play();
				sound.remove();
			}
		}

		document.addEventListener("click", onClick);

		return () => {
			document.removeEventListener("click", onClick);
		};
	}, []);

	const handleToggleScreen = () => {
		for (const app of openedApps) {
			app.close();
		}

		setIsScreenTurnedOn((previousState) => {
			return !previousState;
		});
	};

	// Renderizar mockup de dispositivo móvel se for mobile
	if (isMobile) {
		return (
			<div className="main mobile-main" id="mobile-main">
				{!isScreenTurnedOn && (
					<div className="mobile-device-container">
						<div className="mobile-screen-container">
							<div className="mobile-screen" ref={computerScreenRef}>
								<div className="pop-ups-container" ref={mobilePopUpsContainerRef}>
									{Object.values(openedPopUps).map((popUp) => {
										return popUp[1];
									})}
									{/* Renderizar apps abertos no mobile */}
									{isTerminalOpened ? terminalRef?.current?.render() : null}
									{isTxtOpened ? txtRef?.current?.render() : null}
									{isMyPcOpened ? myPcRef?.current?.render() : null}
									{isDoomOpened ? doomRef?.current?.render() : null}
									{isBrowserOpened ? browserRef?.current?.render() : null}
									{isPaintOpened ? paintRef?.current?.render() : null}
								</div>

								<img className="mobile-screen-background" src="icons/bg1.gif" style={{ width: "100%", height: "100%", overflow: "hidden" }} />

								<div className="mobile-screen-icons-container" ref={appsDisplayParentRef} style={{ position: "absolute", width: "100%", height: "100%" }}>
									<Browser
										iconX={0}
										iconY={0}
										ref={browserRef}
										parentRef={isMobile ? mobilePopUpsContainerRef : appsDisplayParentRef}
										desktopWidth={currentWidth}
										desktopHeight={currentHeight}
										taskbarHeight={TASKBAR_HEIGHT}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={8}
									/>
									<IconDisplay 
										icon="icons/bin.png" 
										title="bin" 
										x={14.5} 
										y={6.5}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={0}
									/>
									<IconDisplay 
										icon="icons/windows-folder.png" 
										title="folder" 
										x={14.5} 
										y={2}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={1}
									/>
									<IconDisplay 
										icon="icons/mp4.png" 
										title="0x.mp4" 
										x={14.5} 
										y={3}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={2}
									/>
									<IconDisplay
										icon="icons/spotify.png"
										title="spotify"
										x={0}
										y={3}
										href="https://open.spotify.com/user/f5n7qoy9fgpnluutioy0cpc5z?si=CKjtwMPATX6omalb-A3JOg"
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={3}
									/>
									<IconDisplay
										icon="icons/instagram.png"
										title="instagram"
										x={0}
										y={1}
										href="https://www.instagram.com/enetojesus"
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={4}
									/>
									<IconDisplay 
										icon="icons/x.png" 
										title="twitter" 
										x={0} 
										y={2} 
										href="https://twitter.com/emal0nn"
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={5}
									/>
									<IconDisplay 
										icon="icons/github.png" 
										title="github" 
										x={0} 
										y={5} 
										href="https://github.com/emal0n"
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={6}
									/>
									<IconDisplay 
										icon="icons/steam.png" 
										title="steam" 
										x={0} 
										y={4} 
										href="https://steamcommunity.com/profiles/76561198761966081"
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={7}
									/>

									<Terminal
										iconX={14.5}
										iconY={0}
										ref={terminalRef}
										parentRef={isMobile ? mobilePopUpsContainerRef : appsDisplayParentRef}
										desktopWidth={currentWidth}
										desktopHeight={currentHeight}
										taskbarHeight={TASKBAR_HEIGHT}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={9}
									/>
									<Txt
										iconX={3}
										iconY={3}
										ref={txtRef}
										parentRef={isMobile ? mobilePopUpsContainerRef : appsDisplayParentRef}
										desktopWidth={currentWidth}
										desktopHeight={currentHeight}
										taskbarHeight={TASKBAR_HEIGHT}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={10}
									/>
									<MyPc
										iconX={14.5}
										iconY={1}
										ref={myPcRef}
										parentRef={isMobile ? mobilePopUpsContainerRef : appsDisplayParentRef}
										desktopWidth={currentWidth}
										desktopHeight={currentHeight}
										taskbarHeight={TASKBAR_HEIGHT}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={11}
									/>
									<Doom
										iconX={13}
										iconY={1}
										ref={doomRef}
										parentRef={isMobile ? mobilePopUpsContainerRef : appsDisplayParentRef}
										desktopWidth={currentWidth}
										desktopHeight={currentHeight}
										taskbarHeight={TASKBAR_HEIGHT}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={12}
									/>
									<Paint
										iconX={13}
										iconY={2}
										ref={paintRef}
										parentRef={isMobile ? mobilePopUpsContainerRef : appsDisplayParentRef}
										desktopWidth={currentWidth}
										desktopHeight={currentHeight}
										taskbarHeight={TASKBAR_HEIGHT}
										isMobile={isMobile}
										containerWidth={currentWidth}
										containerHeight={currentHeight}
										mobileIndex={13}
									/>
								</div>
								<Clock />
								<Volume />
								<Clippy />
								<div
									style={{
										display: "flex",
										position: "absolute",
										bottom: "10px",
										left: "10px",
										fontSize: "12px",
										fontWeight: "bold",
										color: "white",
									}}
								>
									emal0n ©
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	// Renderizar mockup de PC se não for mobile
	return (
		<div className="main" id="computer-main">
			{!isScreenTurnedOn && (
				<div className="lock-computer-crt-container">
					<img className="glitch-screen-effect" src="icons/glitch.gif" />
					<div className="out-light" />
					<div className="shadow" />
					<div className="lock-computer-screen-container" ref={appsDisplayParentRef}>
						{isTerminalOpened ? terminalRef?.current?.render() : null}
						{isTxtOpened ? txtRef?.current?.render() : null}
						{isMyPcOpened ? myPcRef?.current?.render() : null}
						{isDoomOpened ? doomRef?.current?.render() : null}
						{isBrowserOpened ? browserRef?.current?.render() : null}
						{isPaintOpened ? paintRef?.current?.render() : null}
					</div>
					<div className="computer-taskbar-container" ref={appsTaskBarParentRef}>
						{openedApps.map((appRef, index) => {
							return <TaskBarAppDisplay key={appRef?.appearence?.title || index} appRef={appRef} />;
						})}
					</div>
				</div>
			)}

			<div className="computer-crt-container">
				<div className="computer-screen-container">
					{!isScreenTurnedOn ? (
						<div className="computer-screen" ref={computerScreenRef}>
							<div className="pop-ups-container">
								{Object.values(openedPopUps).map((popUp) => {
									return popUp[1];
								})}
							</div>

							<img className="computer-screen-background" src="icons/bg1.gif" style={{ width: "100%", height: "100%", overflow: "hidden" }} />

							<div
								className="computer-screen-icons-container"
								style={{ position: "absolute", width: `${DESKTOP_HEIGHT}px`, height: `${DESKTOP_HEIGHT}px` }}
							>
								{/* {apps.map((app) => app.makeIcon())} */}
								<Browser
									iconX={0}
									iconY={0}
									ref={browserRef}
									parentRef={appsDisplayParentRef}
									desktopWidth={DESKTOP_WIDTH}
									desktopHeight={DESKTOP_HEIGHT}
									taskbarHeight={TASKBAR_HEIGHT}
								/>
								<IconDisplay icon="icons/bin.png" title="bin" x={14.5} y={6.5} />
								<IconDisplay icon="icons/windows-folder.png" title="folder" x={14.5} y={2} />
								<IconDisplay icon="icons/mp4.png" title="0x.mp4" x={14.5} y={3} />
								<IconDisplay
									icon="icons/spotify.png"
									title="spotify"
									x={0}
									y={3}
									href="https://open.spotify.com/user/f5n7qoy9fgpnluutioy0cpc5z?si=CKjtwMPATX6omalb-A3JOg"
								/>
								<IconDisplay
									icon="icons/instagram.png"
									title="instagram"
									x={0}
									y={1}
									href="https://www.instagram.com/enetojesus"
								/>
								<IconDisplay icon="icons/x.png" title="twitter" x={0} y={2} href="https://twitter.com/emal0nn" />
								<IconDisplay icon="icons/github.png" title="github" x={0} y={5} href="https://github.com/emal0n" />
								<IconDisplay icon="icons/steam.png" title="steam" x={0} y={4} href="https://steamcommunity.com/profiles/76561198761966081" />

								<Terminal
									iconX={14.5}
									iconY={0}
									ref={terminalRef}
									parentRef={appsDisplayParentRef}
									desktopWidth={DESKTOP_WIDTH}
									desktopHeight={DESKTOP_HEIGHT}
									taskbarHeight={TASKBAR_HEIGHT}
								/>
								<Txt
									iconX={3}
									iconY={3}
									ref={txtRef}
									parentRef={appsDisplayParentRef}
									desktopWidth={DESKTOP_WIDTH}
									desktopHeight={DESKTOP_HEIGHT}
									taskbarHeight={TASKBAR_HEIGHT}
								/>
								<MyPc
									iconX={14.5}
									iconY={1}
									ref={myPcRef}
									parentRef={appsDisplayParentRef}
									desktopWidth={DESKTOP_WIDTH}
									desktopHeight={DESKTOP_HEIGHT}
									taskbarHeight={TASKBAR_HEIGHT}
								/>
								<Doom
									iconX={13}
									iconY={1}
									ref={doomRef}
									parentRef={appsDisplayParentRef}
									desktopWidth={DESKTOP_WIDTH}
									desktopHeight={DESKTOP_HEIGHT}
									taskbarHeight={TASKBAR_HEIGHT}
								/>
								<Paint
									iconX={13}
									iconY={2}
									ref={paintRef}
									parentRef={appsDisplayParentRef}
									desktopWidth={DESKTOP_WIDTH}
									desktopHeight={DESKTOP_HEIGHT}
									taskbarHeight={TASKBAR_HEIGHT}
								/>
							</div>
							<Clock />
							<Volume />
							<Clippy />
							{/* Please, if you're going to copy at least give me credits.*/}
							<div
								style={{
									display: "flex",
									position: "absolute",
									marginTop: "542px",
									marginLeft: "10px",
									fontSize: "12px",
									fontWeight: "bold",
									color: "white",
								}}
							>
								emal0n ©
							</div>
						</div>
					) : (
						<div className="computer-screen" style={{ backgroundColor: "black" }} />
					)}
				</div>
				<div className="computer-button-container">
					<div className="computer-button-light" style={!isScreenTurnedOn ? {} : { backgroundColor: "red", boxShadow: "0px 0px 25px 1px red" }}></div>
					<button className="computer-button" onClick={handleToggleScreen}></button>
				</div>
			</div>

			<div className="computer-stand"></div>

			<div className="computer-case">
				<div className="computer-diskhat-container" style={{ height: "100%", width: "100%" }}>
					<div className="computer-diskhat">
						<div className="computer-diskhat-input-container">
							<div className="computer-diskhat-input">
								<div className="computer-diskhat-input-2"></div>
							</div>

							<div className="computer-diskhat-button-container" style={{ height: "100px", width: "300px", position: "absolute" }}>
								<div className="computer-diskhat-button"></div>
							</div>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", paddingTop: "30px" }}>
					<div className="computer-turn-button-container">
						<button className="computer-turn-button"></button>
					</div>

					<div className="computer-case-fans-container">
						<img src="icons/fans.png" style={{ width: "279px", height: "80px" }}></img>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

import "./AppDisplay.css";

import React, { useEffect, useRef } from "react";

import PageWithOptions from "./PageWithOptions";

import { useAppsManager } from "../context/AppsManagerContext";

const AppDisplay = React.forwardRef(
	(
		{
			appCoreRef,
			AppRenderer,
			title,
			icon,
			width,
			height,
			x,
			y,
			backgroundColor,
			topBarColor,
			titleColor,
			children,
			onClick,
			onMinimizeButtonClick,
			onCloseButtonClick,
			onTopBarDragStart,
			onTopBarDragEnd,
			onTopBarDrag,
			setDisplayRef,
			overflowY,
			options,
			initialOption,
		},
		ref
	) => {
		const { focusedApp } = useAppsManager();

	const appDisplayRef = useRef(null);
	const touchStartPos = useRef({ x: 0, y: 0 });
	const isDragging = useRef(false);

	useEffect(() => {
		setDisplayRef(appDisplayRef);
	}, [appDisplayRef]);

	// Suporte a eventos de toque para dispositivos móveis
	const handleTouchStart = (e) => {
		if (!onTopBarDragStart) return;
		
		const touch = e.touches[0];
		touchStartPos.current = {
			x: touch.clientX,
			y: touch.clientY,
		};
		isDragging.current = false;
		
		// Simular dragStart
		const fakeEvent = {
			pageX: touch.clientX,
			pageY: touch.clientY,
			dataTransfer: { setDragImage: () => {} },
		};
		onTopBarDragStart(fakeEvent);
	};

	const handleTouchMove = (e) => {
		if (!onTopBarDrag) return;
		
		const touch = e.touches[0];
		const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
		const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
		
		// Considerar como drag se o movimento for maior que 5px
		if (deltaX > 5 || deltaY > 5) {
			isDragging.current = true;
			e.preventDefault(); // Prevenir scroll durante o drag
		}
		
		if (isDragging.current) {
			const fakeEvent = {
				pageX: touch.clientX,
				pageY: touch.clientY,
				clientX: touch.clientX,
				clientY: touch.clientY,
			};
			onTopBarDrag(fakeEvent);
		}
	};

	const handleTouchEnd = (e) => {
		if (!onTopBarDragEnd) return;
		
		if (isDragging.current) {
			const fakeEvent = {
				preventDefault: () => {},
			};
			onTopBarDragEnd(fakeEvent);
		}
		
		isDragging.current = false;
	};

		return (
			<div
				className="app-interface-container"
				style={{
					left: `${x}px`,
					top: `${y}px`,
					height: height,
					width: width,
					position: "absolute",
					backgroundColor: backgroundColor,
					zIndex: focusedApp?.current == appDisplayRef?.current ? 10000 : 9990,
				}}
				ref={appDisplayRef}
				onClick={onClick}
			>
				<div
					draggable
					className="app-interface-top-bar-container"
					style={{ backgroundColor: topBarColor, width: "100%", height: "30px" }}
					onDragStart={onTopBarDragStart}
					onDragEnd={onTopBarDragEnd}
					onDrag={onTopBarDrag}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					<div className="app-interface-top-bar-left-icons-container">
						<img src={icon} className="app-interface-top-bar-icon" />
						<div className="app-interface-top-bar-title" style={{ color: titleColor }}>
							{title}
						</div>
					</div>
					<div className="app-interface-right-icons-container">
						<img src="icons/minimize.png" className="app-interface-top-bar-min-icon" onClick={onMinimizeButtonClick} />
						<img src="icons/Exit.png" className="app-interface-top-bar-close-icon" onClick={onCloseButtonClick} />
					</div>
				</div>

				{options ? (
					<div className="app-interface-content-container" style={{ width: "100%", height: `${height - 30}px`, overflow: `${overflowY}` }}>
						<PageWithOptions appCoreRef={appCoreRef} AppRenderer={AppRenderer} options={options} initialOption={initialOption} appDisplayRef={ref} />
					</div>
				) : (
					<div className="app-interface-content-container" style={{ width: "100%", height: `${height - 30 - (options ? 30 : 0)}px`, overflow: `${overflowY}` }}>
						<AppRenderer appCoreRef={appCoreRef} />
					</div>
				)}
			</div>
		);
	}
);

export default AppDisplay;

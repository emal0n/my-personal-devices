import "./IconDisplay.css";
import { useEffect, useState, useRef } from "react";

function IconDisplay({ icon, title, href, x, y, onIconClicked, isMobile, containerWidth, containerHeight, mobileIndex }) {
	const iconRef = useRef(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (isMobile && containerWidth && containerHeight && mobileIndex !== undefined) {
			// Calcular posições relativas para mobile em um grid adaptativo
			// Usar um grid de 3 colunas para melhor distribuição
			const cols = 3;
			const iconWidth = 70;
			const iconHeight = 80;
			const padding = 15;
			
			// Usar o índice móvel fornecido para posicionar sequencialmente
			const col = mobileIndex % cols;
			const row = Math.floor(mobileIndex / cols);
			
			// Calcular posição centralizada horizontalmente
			const totalWidth = cols * iconWidth + (cols - 1) * padding;
			const startX = Math.max(10, (containerWidth - totalWidth) / 2);
			
			const xPos = startX + col * (iconWidth + padding);
			const yPos = padding + row * (iconHeight + padding);
			
			setPosition({ x: xPos, y: yPos });
		} else {
			// Posições fixas para desktop
			const xPosition = 15 + x * 50;
			const yPosition = 15 + y * (45 + 20 + 10);
			setPosition({ x: xPosition, y: yPosition });
		}
	}, [isMobile, containerWidth, containerHeight, x, y, mobileIndex]);

	const handleClick = (e) => {
		if (onIconClicked) {
			e.preventDefault();
			e.stopPropagation();
			onIconClicked(e);
		}
	};

	const content = (
		<div
			ref={iconRef}
			className={`icon-display-container ${isMobile ? 'icon-mobile' : ''}`}
			style={{
				zIndex: onIconClicked ? "2000" : "1000",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				position: "absolute",
				flexDirection: "column",
				textAlign: "center",
				width: isMobile ? "60px" : "50px",
				height: isMobile ? "70px" : "50px",
				left: `${position.x}px`,
				top: `${position.y}px`,
				cursor: onIconClicked || href ? "pointer" : "default",
				touchAction: "manipulation",
			}}
			onClick={handleClick}
			onTouchStart={(e) => {
				if (onIconClicked) {
					e.preventDefault();
					handleClick(e);
				}
			}}
		>
			<img src={icon} style={{ width: isMobile ? "48px" : "40px", height: isMobile ? "48px" : "45px", pointerEvents: "none" }}></img>
			<span style={{ fontSize: isMobile ? "9px" : "10px", color: "white", fontFamily: "monospace", pointerEvents: "none" }}>{title}</span>
		</div>
	);

	if (href && !onIconClicked) {
		return (
			<a href={href} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
				{content}
			</a>
		);
	}

	return content;
}

export default IconDisplay;

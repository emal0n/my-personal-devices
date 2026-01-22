import "./MobileDisclaimer.css";

function MobileDisclaimer() {
	return (
		<div className="mobile-disclaimer">
			<span>Sorry. This page wasn't built to run on mobile devices yet. Please access it from a computer.</span>
			<div className="mobile-disclaimer-icons" style={{ display: "flex", justifyContent: "center", columnGap: "10px" }}>
				<a href="https://github.com/emal0n/my-personal-devices">
					<img src="icons/github.svg" style={{ width: "30px", height: "30px" }}></img>
				</a>
				<a href="https://x.com/emal0nn">
					<img src="icons/twitter.svg" style={{ width: "30px", height: "30px" }}></img>
				</a>
			</div>
		</div>
	);
}

export default MobileDisclaimer;

import "./MyPcConfigRenderer.css";
import "../MyPcRenderer.css";
import Button from "../../../components/Button";

function MyPcConfigRenderer({ appRef }) {
	return (
		<div className="my-pc-renderer-container">
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">ABOUT ME</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father-container">
					<div className="my-pc-info-container">
						<div>
							<img src="icons/me.jpeg" style={{ width: "140px", height: "140px" }}></img>
						</div>
						<div className="my-pc-title2-container">
							<a className="my-pc-title">Edmundo.</a>
							<a>Systems Development ➧ 21y</a>
						</div>
					</div>
					<div className="my-pc-info-container-2">
						<div className="my-pc-title2-container">
							<a className="my-pc-title-2">Stacks:</a>
							<a>Loading...:) return soon</a>
						</div>
					</div>
				</div>
			</div>
			<div className="my-pc-config-button-container">
				<Button text={"Ok"} width={"70px"} height={"20px"} />
			</div>
		</div>
	);
}

export default MyPcConfigRenderer;

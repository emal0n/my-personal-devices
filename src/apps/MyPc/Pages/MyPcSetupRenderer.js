import "./MyPcSetupRenderer.css";
import "../MyPcRenderer.css";

function MyPcSetupRenderer({ appRef }) {
	return (
		<div className="my-pc-renderer-container">
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">config</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father-container">
					<div className="my-pc-info-container">
						<div className="my-pc-title3-container">
							ThinkPad T14 Gen 3
                            <br/>
                            Intel Core i5-1245U
                            <br/>16 GBytes RAM
							<br/>
                            SSD 256GB M.2 NVMe
						</div>
						<div>
							<img src="icons/thinkpad.png" style={{ width: "260px", height: "160px" }}></img>
						</div>
					</div>
				</div>
			</div>
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">setup</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father2-container">
					<div className="my-pc-setup-info-container">ThinkBook Mouse<br/>Monitor Arzopa A1S</div>
				</div>
			</div>
		</div>
	);
}

export default MyPcSetupRenderer;

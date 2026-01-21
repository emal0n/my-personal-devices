import Tool from "./Tool";

class PencilTool extends Tool {
	constructor(paintRendererRef) {
		super(paintRendererRef);
		this.isDrawing = false;
	}

	onMousePressBegin(event) {
		this.isDrawing = true;
	}

	onMousePressLeave(event) {
		this.isDrawing = false;
	}

	onMouseMove(event) {
		if (!this.isDrawing) {
			return;
		}

		const [x, y] = this.paintRendererRef.current.getPixelFromMousePosition(event);
		this.paintRendererRef.current.paintPixel(x, y);
	}

	onToolActivated() {
		document.body.style.cursor = "url('./icons/mspaint-pencil.png'), auto";
	}

	onToolDisabled() {
		document.body.style.cursor = "default";
	}
}

export default PencilTool;

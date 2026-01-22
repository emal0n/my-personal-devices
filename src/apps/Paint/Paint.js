import React from "react";

import AppCore from "../AppCore";
import PaintRenderer from "./PaintRenderer";

const Paint = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={PaintRenderer}
			iconX={iconX}
			iconY={iconY}
			title="paint"
			icon="icons/paint.png"
			width={400}
			height={490}
			backgroundColor="#0a0a0a"
			topBarColor="#39ff14"
			titleColor="#0a0a0a"
			ref={ref}
			parentRef={parentRef}
			overflowY="hidden"
			{...others}
		/>
	);
});

export default Paint;

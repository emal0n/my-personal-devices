import React from "react";

import AppCore from "../AppCore";
import BrowserRenderer from "./BrowserRenderer";

const Browser = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={BrowserRenderer}
			iconX={iconX}
			iconY={iconY}
			title="internet"
			icon="icons/explorer.png"
			width={530}
			height={350}
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

export default Browser;

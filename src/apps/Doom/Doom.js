import React from "react";

import AppCore from "../AppCore";
import DoomRenderer from "./DoomRenderer.js";

const Doom = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
            AppRenderer={DoomRenderer}
			iconX={iconX}
			iconY={iconY}
			title="Doom"
			icon="icons/doom.png"
			width={640}
			height={426}
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

export default Doom;

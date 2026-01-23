import React from "react";

import AppCore from "../AppCore";

import MyPcConfigRenderer from "./Pages/MyPcConfigRenderer";
import MyPcSetupRenderer from "./Pages/MyPcSetupRenderer";
import MyPcExperiencesRenderer from "./Pages/MyPcExperiencesRenderer";

const MyPc = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={{
				config: MyPcConfigRenderer,
				setup: MyPcSetupRenderer,
				experiences: MyPcExperiencesRenderer,
			}}
			iconX={iconX}
			iconY={iconY}
			title="myPc"
			icon="icons/pc.png"
			width={530}
			height={450}
			backgroundColor="#0a0a0a"
			topBarColor="#39ff14"
			titleColor="#0a0a0a"
			ref={ref}
			parentRef={parentRef}
			overflowY="hidden"
			options={["config", "setup", "experiences"]}
			initialOption="config"
			{...others}
		/>
	);
});

export default MyPc;

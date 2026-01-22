import "./TxtRenderer.css";

function TxtRenderer({ appCoreRef }) {
	return (
		<div className="app-txt-renderer-container">
			This file is just in case you want to know a little bit more about me.
			<div>
				<br />
			</div>
			<a>
				My journey in technology started with a Lumia 630 stuck on Windows 8.1. After discovering how to manually update it to Windows 10 and making some system modifications, I migrated to Android, where my curiosity truly expanded. That's when I dove into root, custom ROMs, bootloader, and the entire internal universe of devices.
			</a>
			<div className="app-txt-renderer-selfie">
				<a>
					Over time, I started working as a tester for various developers, collecting logs and validating features. The desire to understand more led me to seek out how to compile Android, which opened doors to kernel, vendor, Linux, cloud, and other concepts that shaped my path.
				</a>
			</div>
			<div>
				<br />
			</div>
			<div>
				Today it's already been 11 years of immersion in technology and 3+ years working professionally with software engineering. Documentation, best practices, and solving problems are part of my daily routine. Linux, especially Fedora, has become my main system.
				<div>
					<br />
				</div>
				When I'm not adjusting infrastructure, producing, or following news from the programming and operating systems world, I'm probably exploring something new on Linux or stuck in a game I promised to play "just for 10 minutes".
				<div>
					<br />
				</div>
				Feel free to reach out to me for any questions, potential opportunities, or ideas you'd like to share!
			</div>
		</div>
	);
}

export default TxtRenderer;

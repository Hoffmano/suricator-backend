import { PythonShell } from "python-shell";
import path from "path";

export async function pln(lyrics: any) {
	lyrics = lyrics.replace(/[(?<=\[)](.*?)[(?=\])]/g, " ");
	lyrics = lyrics.replace(/[(?=\n)][\n]{1,9}[?<=\n]/g, "");
	lyrics = lyrics.replace(/\n/g, ". ");
	lyrics = lyrics.replace(/(?<=\s)[(\.)]/g, "");
	lyrics = lyrics.replace(/^\./g, "");
	lyrics = lyrics.replace(/(?<=\?)\./g, "");
	lyrics = lyrics.replace(/\s{1,9}/g, " ");
	lyrics = lyrics.replace(/\"/g, "");
	lyrics = lyrics.replace(/\.{1,9}/g, ".");
	lyrics = lyrics.replace(/\!\./g, "!");
	lyrics = lyrics.replace(/\?\./g, "?");
	lyrics = lyrics.trim();

	const pythonShell = new PythonShell("main.py", {
		mode: "text",
		scriptPath: path.join(__dirname, "scripts"),
		args: [lyrics],
	});

	let promise = new Promise((resolve, reject) => {
		pythonShell.on("message", function (message) {
			resolve(message);
		});
	});
    let result = [await promise];
    console.log(result)
	// await console.log(result);
	return result;
}

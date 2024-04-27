export interface NameValuePair<T> {
	name: string;
	value: T;
}

export type TrueOrFalse = "true" | "false";
function isTrueOrFalse(input: string): input is TrueOrFalse {
	return input === "true" || input === "false";
}

export function toTrueOrFalse(input?: string) {
	if (!input) {
		return "false";
	}

	if (isTrueOrFalse(input)) {
		return input;
	}

	throw new Error(`${input} is neither "true" nor "false"!`);
}

export type InputEventWithTarget = Event & { currentTarget: HTMLInputElement };

export interface NameValuePair<T> {
	name: string;
	value: T;
}

export type TrueOrFalse = "true" | "false";
export function isTrueOrFalse(input: string): input is TrueOrFalse {
	return input === "true" || input === "false";
}

export type InputEventWithTarget = Event & { currentTarget: HTMLInputElement };

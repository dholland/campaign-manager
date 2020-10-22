import { random } from "../util";

export function d20Roll(type) {
	const rolls = [];
	let result = 0;
	
	rolls.push(random(1, 20));
	if (type !== "normal") {
		rolls.push(random(1, 20));
	}
	switch (type) {
		case "adv":
			result = Math.max(...rolls);
		break;
		case "dis":
			result = Math.min(...rolls);
		break;
		default:
			result = rolls[0];
		break;
	}
	
	return [ rolls, result ];
}

export function roll(die, dice) {
	const rolls = [];
	let result = 0;
	
	for (let i = 0; i < dice; i++) {
		let roll = random(1, die);
		rolls.push(roll);
		result += roll;
	}
	
	return [rolls, result];
}
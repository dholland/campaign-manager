export function random(min, max) {
	if (min > max) {
		let temp = min;
		min = max;
		max = temp;
	}
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min)) + min;
}

export function sum(...args) {
	return args.reduce((s, num) => {
		if (typeof num !== "number") {
			num = parseInt(num);
		}
		if (Number.isNaN(num)) {
			return s;
		}
		return s + num;
	}, 0);
}

// ==========
// Array Utilities
// ==========

export function pushUnique(arr, ...values) {
	values.forEach(val => {
		if (!arr.includes(val)) {
			arr.push(val);
		}
	});
	return arr;
}
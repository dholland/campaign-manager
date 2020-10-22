import * as Rolls from "./Rolls";

export default class RollSettings {
	_die;
	_dice = 1;
	_mod = 0;
	_modSign = "+";
	_type = "normal";
	_showIndividualDice = true;
	_features = [];
	_result = {};
	
	constructor(die) {
		this._die = die;
	}
	
	// ==========
	// Property Accessors
	// ==========
	
	get die() { return this._die; }
	get dice() { return this._dice; }
	set dice(dice) {
		if (typeof dice !== "number") {
			dice = parseInt(dice);
		}
		if (Number.isNaN(dice)) {
			return;
		}
		this._dice = Math.max(1, Math.round(dice));
	}
	get mod() { return this._mod; }
	set mod(mod) {
		if (typeof mod !== "number") {
			mod = parseInt(mod);
		}
		if (Number.isNaN(mod)) {
			return;
		}
		this._mod = Math.round(mod);
		this._modSign = (mod < 0) ? "-" : "+";
	}
	get type() { return this._type; }
	set type(type) {
		if (type === "normal") {
			this._type = type;
		} else if (this._die === 20 && ["adv", "dis"].includes(type)) {
			this._type = type;
		} else if (![20, 100].includes(this._die) && type === "crit") {
			this._type = type;
		} else {
			this._type = "normal";
		}
	}
	get showIndividualRolls() { return this._showIndividualRolls; }
	set showIndividualRolls(show) { this._showIndividualRolls = show; }
	get features() { return [...this._features]; }
	get result() { return {...this._result}; }
	
	// ==========
	// Methods
	// ==========
	
	setProp(propName, value) {
		this[propName] = value;
		return this;
	}
	
	addFeature(feature) {
		this._features.push(feature);
		return this;
	}
	
	removeFeature(featureId) {
		this._features = this._features.filter(f => featureId !== f._id);
		return this;
	}
	
	enableFeature(featureId) {
		this._features.find(f => f._id === featureId).enabled = true;
		return this;
	}
	
	disableFeature(featureId) {
		this._features.find(f => f._id === featureId).enabled = false;
		return this;
	}
	
	// ==========
	// Roll
	// ==========
	
	roll = () => {
		const result = {
			total : 0,
			baseRolls : [],
			baseTotal : 0,
			addRolls : {},
			addTotal : 0,
			subRolls : {},
			subTotal : 0,
			modTotal : this._mod,
			rollString : `${this._dice}d${this._die}`,
			resultString : "",
		};
		
		const adds = [];
		const subs = [];
		const mods = [];
		const rerolls = [];
		this._features.forEach(f => {
			switch (f.type) {
				case "add":
					adds.push(f);
				break;
				case "sub":
					subs.push(f);
				break;
				case "mod":
					mods.push(f);
				break;
				case "reroll":
					rerolls.push(f);
				break;
				default: break;
			}
		});
		
		if (this._die === 20) {
			let [ rolls, total ] = Rolls.d20Roll(this._type);
			result.baseTotal = total;
			result.baseRolls = rolls;
		} else {
			let [ rolls, total ] = Rolls.roll(this._die, this._dice);
			if (this._type === "crit") {
				total *= 2;
			}
			result.baseTotal = total;
			result.baseRolls = rolls;
		}
		
		adds.forEach(f => {
			let [rolls, total] = Rolls.roll(f.die, f.dice);
			if (this._type === "crit" && f.doubleOnCrit) {
				total *= 2;
			}
			result.adds[f._id] = { rolls, total };
			result.rollString += ` + ${f.dice}d${f.die}`;
			result.addTotal += total;
		});
		subs.forEach(f => {
			let [rolls, total] = Rolls.roll(f.die, f.dice);
			result.subs[f._id] = { rolls, total };
			result.subTotal += total;
			result.rollString += ` - ${f.dice}d${f.die}`;
		});
		mods.forEach(f => {
			result.modTotal += f.mod;
		});
		
		result.total = result.baseTotal;
		result.resultString = `${result.baseTotal}`;
		if (result.addtotal > 0) {
			result.total += result.addTotal;
			result.resultString += ` + ${result.addtotal}`;
		}
		if (result.subTotal > 0) {
			result.total -= result.subTotal;
			result.resultString += ` - ${result.subTotal}`;
		}
		result.total += result.modTotal;
		if (result.modTotal > 0) {
			result.rollString += ` + ${result.modTotal}`;
			result.resultString += ` + ${result.modTotal}`;
		} else if (result.modTotal < 0) {
			result.rollString += ` - ${Math.abs(result.modTotal)}`;
			result.resultString += ` - ${Math.abs(result.modTotal)}`;
		}
		
		if (this._die === 100) {
		result.percent = `${Math.round(result.total / (100 * this._dice) * 100)}%`;
		}
		
		this._result = result;
		return this;
	};
	
	
}
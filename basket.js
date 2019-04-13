const _ = require('lodash');
const { calculateRemaining, priceList } = require('./rules');

class Basket {
	constructor(pricingRules = []) {
		this.items = [];
		this.rules = [...pricingRules];
	};

	add(item) {
		this.items.push(item);
	};

	addRule(rule) {
		this.rules.push(rule);
	};

	applyRules() {
		return this.rules.map(rule => rule.func)
	};

	deleteRule(ruleToDelete) {
		this.rules = [...this.rules.filter(rule => rule.name !== ruleToDelete )];
	};

	total() {
		return _.flow(
			...this.applyRules(),
			calculateRemaining,
		)({ items: [...this.items], prices: { ...priceList }});
	};
};

module.exports = Basket;

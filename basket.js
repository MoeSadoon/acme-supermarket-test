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

	deleteRule(ruleToDelete) {
		this.rules = [...this.rules.filter(rule => rule.name !== ruleToDelete )];
	};
};

module.exports = Basket;

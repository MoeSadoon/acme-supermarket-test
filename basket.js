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

	deleteRule(ruleToDelete) {
		this.rules = [...this.rules.filter(rule => rule.name !== ruleToDelete )];
	};

	total() {
		return calculateRemaining({items: [...this.items], prices: { ...priceList }});
	};
};

module.exports = Basket;

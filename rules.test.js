const { calculateRemaining, fruitTeaBOGOF, priceList } = require('./rules');

describe('calculateRemaining', () => {
	it('should calculate basket total independent of any price rules applied', () => {
		// arrange
		const items = ['CF1', 'FR1', 'XYZ']
		// act
		const total = calculateRemaining({ items, prices: priceList});
		// assert
		expect(total).toBe(14.34)
	});
});

describe('fruitTeaBOGOF', () => {
	it('should calculate BOGOF total price for fruit teas and removes it from basket', () => {
		// arrange
		const items = ['CF1', 'FR1', 'FR1', 'FR1', 'XYZ']
		// act
		const result = fruitTeaBOGOF({ items, prices: priceList });
		// assert
		expect(result.total).toBe(6.22);
		expect(result.items.indexOf('FR1')).toBe(-1);
	});
})
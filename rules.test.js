const { calculateRemaining, priceList } = require('./rules');

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
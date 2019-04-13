const { 
  calculateRemaining,
  fruitTeaBOGOF,
  priceList,
  threeOrMoreStrawberriesOffer
} = require('./rules');

describe('calculateRemaining', () => {
	it('should calculate basket total independent of any price rules applied', () => {
		// arrange
		const items = ['CF1', 'FR1', 'XYZ'];
		// act
		const total = calculateRemaining({ items, prices: { ...priceList }});
		// assert
		expect(total).toBe(14.34);
	});
});

describe('fruitTeaBOGOF', () => {
	it('should calculate BOGOF total price for fruit teas and removes it from basket', () => {
		// arrange
		const items = ['CF1', 'FR1', 'FR1', 'FR1', 'XYZ']
		// act
		const result = fruitTeaBOGOF({ items, prices: { ...priceList } });
		// assert
		expect(result.total).toBe(6.22);
		expect(result.items.indexOf('FR1')).toBe(-1);
	});
});

describe('threeOrMoreStrawberriesOffer', () => {
  it('should not change price of strawberries if less than 3 in basket', () => {
    // arrange
		const items = ['SR1', 'SR1'];
		// act
		const result = threeOrMoreStrawberriesOffer({ items, prices: { ...priceList } });
		// assert
		expect(result.prices['SR1']).toBe(priceList['SR1']);
  });
  it('should reduce price of strawberries to 4.50 each if 3 or more in basket', () => {
    // arrange
		const items = ['SR1', 'SR1', 'SR1'];
		// act
		const result = threeOrMoreStrawberriesOffer({ items, prices: { ...priceList } });
		// assert
		expect(result.prices['SR1']).toBe(4.50);
  });
});

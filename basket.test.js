const Basket = require('./basket');

describe('Basket', () => {
  it('should instantiate basket with empty items list and any rules provided', () => {
    // arrange
    const pricingRules = [{
      foo: () => {},
    }];
    // act
    const basket = new Basket(pricingRules);
    // assert
    expect(basket.items).toEqual([]);
    expect(basket.rules).toEqual([...pricingRules]);
  });
  describe('add', () => {
    it('should add a product to the basket items list', () => {
      // arrange
      const pricingRules = [{
        name: 'foo',
        func: () => {}, 
      }];
      // act
      const basket = new Basket(pricingRules);
      basket.add('CF1');
      // assert
      expect(basket.items).toEqual(['CF1']);
    });
  });
  describe('addRule', () => {
    it('should add a rule to the existing price rules list', () => {
      // arrange
      const pricingRules = [{
        name: 'foo',
        func: () => {},
      }];
      const newRule = { name: 'bar', func: () => {} };
      // act
      const basket = new Basket(pricingRules);
      basket.addRule(newRule);
      // assert
      expect(basket.rules).toEqual([...pricingRules, newRule]);
    });
  });
  describe('deleteRule', () => {
    it('should remove rule from the existing price rules list', () => {
      // arrange
      const pricingRules = [{
        name: 'foo',
        func: () => {},
      }];
      // act
      const basket = new Basket(pricingRules);
      basket.deleteRule('foo');
      // assert
      expect(basket.rules).toEqual([]);
    });
  });
  describe('total', () => {
    it('should calculate total price of items in basket', () => {
      // arrange
      const pricingRules = [];
      // act
      const basket = new Basket(pricingRules);
      basket.add('CF1');
      basket.add('FR1');
      const total = basket.total();
      // assert
      expect(total).toBe(14.34);
    });
  });
});

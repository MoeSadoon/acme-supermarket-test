const Basket = require('./basket');
const { fruitTeaBOGOF, threeOrMoreStrawberriesOffer } = require('./rules');

describe('Basket', () => {
  it('should instantiate basket with empty items list and any rules provided', () => {
    // arrange
    const pricingRules = [{
      foo: () => { },
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
        func: () => { },
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
        func: () => { },
      }];
      const newRule = { name: 'bar', func: () => { } };
      // act
      const basket = new Basket(pricingRules);
      basket.addRule(newRule);
      // assert
      expect(basket.rules).toEqual([...pricingRules, newRule]);
    });
  });

  describe('applyRules', () => {
    it('should return all the rule functions', () => {
      // arrange
      const pricingRules = [
        {
          name: 'foo',
          func: () => { },
        },
        {
          name: 'bar',
          func: () => { },
        },
      ];
      // act
      const basket = new Basket(pricingRules);
      const basketRuleFunctions = basket.applyRules();
      // assert
      expect(basketRuleFunctions.length).toEqual(pricingRules.length);
      basketRuleFunctions.every(func => expect(typeof func).toBe('function'));
    });
  });

  describe('deleteRule', () => {
    it('should remove rule from the existing price rules list', () => {
      // arrange
      const pricingRules = [{
        name: 'foo',
        func: () => { },
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
    it('should calculate total correctly with BOGOF Fruit Tea rule enabled', () => {
      // arrange
      const pricingRules = [{
        name: 'fruit_tea_buy_one_get_one_free',
        func: fruitTeaBOGOF,
      }];
      // act
      const basket = new Basket(pricingRules);
      basket.add('FR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('CF1');
      const total = basket.total();
      // assert
      expect(total).toBe(19.34);
    });
    it('should calculate total correctly with Strawberry offer rule enabled', () => {
      // arrange
      const pricingRules = [{
        name: 'strawberry_offer',
        func: threeOrMoreStrawberriesOffer,
      }];
      // act
      const basket = new Basket(pricingRules);
      basket.add('SR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('SR1');
      const total = basket.total();
      // assert
      expect(total).toBe(16.61);
    });
    it('should calculate total correctly with both Fruit tea and Strawberry offer rules enabled', () => {
      // arrange
      const pricingRules = [
        {
          name: 'fruit_tea_buy_one_get_one_free',
          func: fruitTeaBOGOF,
        },
        {
          name: 'strawberry_offer',
          func: threeOrMoreStrawberriesOffer,
        },
      ];
      // act
      const basket = new Basket(pricingRules);
      basket.add('SR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('CF1');
      const total = basket.total();
      // assert
      expect(total).toBe(27.84);
    });
    it('should add and apply rules on the fly', () => {
      // arrange
      const pricingRules = [{
        name: 'fruit_tea_buy_one_get_one_free',
        func: fruitTeaBOGOF,
      }];
      // act
      const basket = new Basket(pricingRules);
      basket.add('SR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('CF1');
      basket.addRule({
        ruleName: 'strawberry_offer',
        func: threeOrMoreStrawberriesOffer,
      });
      const total = basket.total();
      // assert
      expect(total).toBe(27.84);
    })
    it('should remove and sync rules on the fly', () => {
      // arrange
      const pricingRules = [
        {
          name: 'fruit_tea_buy_one_get_one_free',
          func: fruitTeaBOGOF,
        },
        {
          name: 'strawberry_offer',
          func: threeOrMoreStrawberriesOffer,
        },
      ];
      // act
      const basket = new Basket(pricingRules);
      basket.add('SR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('SR1');
      basket.add('FR1');
      basket.add('CF1');
      basket.deleteRule('fruit_tea_buy_one_get_one_free');
      const total = basket.total();
      // assert
      expect(total).toBe(30.95);
    });
  });
});

const priceList = {
	CF1: 11.23,
	FR1: 3.11,
	SR1: 5.00,
};

/* 
  Calculates the total price of all items added to basket,
  irrespective of any rules that may or may not have been
  applied.
*/
const calculateRemaining = ({ items, prices, total = 0}) => (
	items.reduce((sum, item) => {
		if(prices[item]) {
			sum += prices[item];
		}
		return sum;
    }, total)
);

/* PRICE RULE(1): 2 for the price of 1 for Fruit Teas. */
const fruitTeaBOGOF = ({ items, prices, total = 0}) => {
  /* Independently calculated price of tea with offer added to existing total price. */
  const newTotal =
    total + Math.ceil(items.filter(item => item === 'FR1').length / 2*1) * prices['FR1'];
  /* 
    Fruit teas removed from basket items list so not be
    calculated again by ultimate 'calculateRemaining' function.
  */
  const newBasketItems = items.filter(item => item !== 'FR1');
  return { items: newBasketItems, prices, total: newTotal }
};

/* PRICE RULE(2): Reduces strawberry price to 4.50 each if 3 or more in basket */
const threeOrMoreStrawberriesOffer = ({items, prices, total = 0}) => {
	const strawberryPrice = items
		.filter(item => item === 'SR1').length > 2 ? 4.50 : prices['SR1'];
	return { items, prices: { ...prices, SR1: strawberryPrice}, total }
};

module.exports = {
  calculateRemaining,
  fruitTeaBOGOF,
  priceList,
  threeOrMoreStrawberriesOffer,
};

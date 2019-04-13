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

module.exports = {
  calculateRemaining,
  priceList,
};

// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

/**
* @type {FunctionRunResult}
*/
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};
  /**
  * @param {RunInput} input
  * @returns {FunctionRunResult}
  */
  export function run(input) {
    const targets = [{ orderSubtotal:{
      excludedVariantIds:[]
    }
  }]
    
    if(input.cart.cost.totalAmount.amount > 1000){
      return {
        discounts: [
          {
            conditions: [{orderMinimumSubtotal: 
              {
                excludedVariantIds:[],
                minimumAmount:"1000",
                // @ts-ignore
                targetType: 'ORDER_SUBTOTAL',
                
              }}
            ],
            targets,
            value: {
              fixedAmount:{
                amount: "100"
              }
            }}
          ],
          discountApplicationStrategy: DiscountApplicationStrategy.First
        };
    }
    
  if (!targets.length) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }
  
  return {
    discounts: [
      {
        conditions: [{orderMinimumSubtotal: 
          {
            excludedVariantIds:[],
            minimumAmount:"1000",
            // @ts-ignore
            targetType: 'ORDER_SUBTOTAL',
            
          }}
        ],
        targets,
        value: {
          percentage: {
            // Use the configured percentage instead of a hardcoded value
            value: '10'
          }
        }}
      ],
      discountApplicationStrategy: DiscountApplicationStrategy.First
    };
  };
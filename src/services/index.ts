import { CustomizedOrder } from "../types";

/**
 * Service to handle ordering, configuration, and preset operations.
 */
export async function submitOrder(order: CustomizedOrder, shippingData: {
  email: string;
  fullName: string;
  address: string;
  city: string;
  zip: string;
  giftNote?: string;
  includeGiftWrap?: boolean;
}): Promise<{ success: boolean; orderId: string }> {
  // Simulate API post call to full-stack server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `LW-${Math.floor(100000 + Math.random() * 905471)}`,
      });
    }, 1500);
  });
}

import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
    orderId: number,
    amount:  number,
    description: string,

}

export async function createPayment(details: Props) {



  console.log("[DEBUG] storeId:", process.env.YOUMONEY_STORE_ID);
  console.log("[DEBUG] apiKey:", process.env.YOUMONEY_API_KEY);
  console.log("[DEBUG] returnUrl:", process.env.YOUKASSA_CALLBACK_URL);
  console.log("[DEBUG] amount:", details.amount);



   try {
     const { data } = await axios.post<PaymentData>(
        'https://api.yookassa.ru/v3/payments',
        {
            amount: {
                value: Number(details.amount).toFixed(2),
                currency: 'RUB'
            },
            capture: true,
            description: details.description,
            metadata: {
                order_id: details.orderId
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOUKASSA_CALLBACK_URL
            }
        }, {
            auth: {
                username: process.env.YOUMONEY_STORE_ID as string,
                password: process.env.YOUMONEY_API_KEY as string
            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7),
            }
        }
    )

    return data;
   } catch (error: any) {
        if (axios.isAxiosError(error)) {
    console.error("❌ [Axios ERROR Response]", {
      status: error.response?.status,
      headers: error.response?.headers,
      data: error.response?.data,
    });
  } else {
    console.error("❌ [Generic Error]", error);
  }
  throw error;
   }
}
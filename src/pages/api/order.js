import Razorpay from "razorpay";

const handler = async (req, res) => {
  
  const rzp = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })

  const order = await rzp.orders.create({
    amount: 5000000,
    currency: 'INR',
    method: 'netbanking',
    bank_account: {
      account_number: process.env.ACCOUNT_NUMBER,
      name: 'Priyansh Rastogi',
      ifsc: process.env.IFSC,
    },
    notes: {
      TxnId: 'Test12345',
    },
  })
  
  res.status(200).json(order)
}

export default handler;
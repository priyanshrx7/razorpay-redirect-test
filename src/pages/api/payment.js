import Razorpay from "razorpay";

const handler = async (req, res) => {
  const rzp = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })

  const paymentId = req.body.razorpay_payment_id

  if(paymentId) {
    const payment = await rzp.payments.fetch(req.body.razorpay_payment_id)

    if (payment.status === 'captured') {
      res.redirect('/success', 301)
    } else {
      res.redirect('/failed', 301)
    }
  }

  const error = req.body['error[description]']

  res.redirect(`/failed?error=${error}`, 301)
}

export default handler;
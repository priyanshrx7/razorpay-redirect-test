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
      return res.redirect(307, '/success')
    } else {
      return res.redirect(307, '/failed')
    }
  }

  const error = req.body['error[description]']

  res.redirect(307, `/failed?error=${error}`)
}

export default handler;
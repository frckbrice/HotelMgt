import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createBooking, updateHotelRoom } from "@/libs/apis";

//* How to set up your webhook integration

//1. identification of the event we want to monitor
const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

//2. develop a webhook endpoint function to receive event data POST request
export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    console.log(
      "error occured while generating event from webhook constructor: ",
      error
    );
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;
      console.log(session);

      await createBooking({
        adults: Number(session.metadata?.adults),
        checkinDate: session.metadata?.checkinDate as string,
        checkoutDate: session.metadata?.checkoutDate as string,
        children: Number(session.metadata?.children),
        hotelRoom: session.metadata?.hotelRoom as string,
        numberOfDays: Number(session.metadata?.numberOfDays),
        discount: Number(session.metadata?.discount),
        totalPrice: Number(session.metadata?.totalPrice),
        user: session.metadata?.user as string,
      });
      //   Update hotel Room
      await updateHotelRoom(session.metadata?.hotelRoom as string);
      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}

// need to test locally : install stripe cli

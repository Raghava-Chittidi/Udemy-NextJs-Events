import mongoose from "mongoose";
import Newsletter from "../../models/Newsletter";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.poa6kpu.mongodb.net/${process.env.MONGODB_NAME}`
    );
    const newSubscriber = new Newsletter({ email: email });

    try {
      await newSubscriber.save();
    } catch (err) {
      res.status(500).json({ message: "Failed to subscribe to newsletter!" });
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  }
};

export default handler;

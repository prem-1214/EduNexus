import Message from "../models/message.model.js"
import Chat from "../models/chat.model.js"

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body
    const sender = req.user._id

    let message = await Message.create({
      sender,
      content,
      chat: chatId,
    })

    message = await message.populate("sender", "userName email")
    message = await message.populate({
      path: "chat",
      populate: {
        path: "users",
        select: "userName email",
      },
    })
    // console.log("Message sent:", message)

    res.status(200).json(message)
  } catch (error) {
    console.error("Send Message Error:", error)
    res.status(500).json({ error: "Failed to send message" })
  }
}

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "userName email")
      .populate("chat")

    res.status(200).json(messages)
  } catch (error) {
    console.error("Get Messages Error:", error)
    res.status(500).json({ error: "Failed to fetch messages" })
  }
}

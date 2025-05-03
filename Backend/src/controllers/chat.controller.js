import Chat from "../models/chat.model.js"
import User from "../models/user.model.js"

// Access or create a one-on-one chat
const accessChat = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ message: "UserId param not sent" })
  }

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage")

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "userName email",
    })

    if (chat) return res.status(200).json(chat)

    // create chat if doesn't exist
    const newChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    })

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    )
    console.log("New chat created", fullChat)
    res.status(200).json(fullChat)
  } catch (err) {
    res.status(500).json({ message: "Chat error", error: err.message })
  }
}

// Fetch all chats of the logged-in user
const fetchChats = async (req, res) => {
  try {
    let chats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "userName email",
    })

    res.status(200).json(chats)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load chats", error: err.message })
  }
}

const searchUsersController = async (req, res) => {
  try {
    const { query } = req.query

    if (!query) return res.status(400).json({ message: "Query is required" })

    const regex = new RegExp(query, "i")

    const users = await User.find({
      $or: [{ userName: regex }, { email: regex }],
    }).select("userName email avatar")

    return res.status(200).json(users)
  } catch (error) {
    console.error("Error searching users:", error)
    return res.status(500).json({ message: "Server error", error })
  }
}

// Create a group chat
const createGroupChat = async (req, res) => {
  const { users, name } = req.body

  if (!users || !name) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const userList = JSON.parse(users)
  if (userList.length < 2) {
    return res
      .status(400)
      .json({ message: "At least 2 users are required for a group chat" })
  }

  userList.push(req.user)

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: userList,
      isGroupChat: true,
      groupAdmin: req.user,
    })

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    res.status(200).json(fullGroupChat)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating group chat", error: err.message })
  }
}

// Rename a group
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    res.status(200).json(updatedChat)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to rename chat", error: err.message })
  }
}

// Add a user to a group
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body

  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    res.status(200).json(added)
  } catch (err) {
    res.status(500).json({ message: "Failed to add user", error: err.message })
  }
}

// Remove a user from a group
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    res.status(200).json(removed)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove user", error: err.message })
  }
}

export {
  accessChat,
  fetchChats,
  searchUsersController,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
}

const { isAuthentication } = require("../middlewares/auth");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const { getReceiverSocketId, io } = require("../socket/socket");
const upload = require('../cloudinary/cloudinaryMulterConfig');

exports.SendMessage = [
    isAuthentication,
    upload.single('file'),

    async (req, res) => {
        try {
            const { text } = req.body;
            const sender = req.user.userId;
            const receiver = req.params.id;

            let conversation = await Conversation.findOne({
                participants: { $all: [sender, receiver] }
            });

            if (!conversation) {
                conversation = new Conversation({
                    participants: [sender, receiver],
                    messages: [],
                });

            }

            const newMessage = new Message({
                sender,
                receiver,
                text,
                fileUrl: req.file ? req.file.path : "",
                fileType: req.file ? req.file.mimetype.split('/')[0] : "",
            });

            await newMessage.save();

            const user = await User.findById(sender);

            const IsFriendExist = user.friends.includes(receiver);

            if (!IsFriendExist) {
                const receiverUser = await User.findById(receiver);
                user.friends.push(receiver);
                await user.save();

                const isSenderIsFriend = receiverUser.friends.includes(sender);
                if (!isSenderIsFriend) {
                    receiverUser.friends.push(sender);
                }
                await receiverUser.save();
            }



            conversation.messages.push(newMessage._id);
            await conversation.save();

            //SOCKET
            //sender side
            const senderSocketId = getReceiverSocketId(sender);

            if (senderSocketId) {
                io.to(senderSocketId).emit("newMessage", newMessage);
            }

            // receiver side
            const receiverSocketId = getReceiverSocketId(receiver);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }

            res.status(201).json({ success: true, message: "Message sent" });

        } catch (error) {
            console.log(error);
        }
    }
];


exports.getAllMessagesBetweenTwoUser = [
    isAuthentication,
    async (req, res) => {
        try {

            const sender = req.user.userId;
            const receiver = req.params.id;

            const conversation = await Conversation.findOne({
                participants: { $all: [sender, receiver] }
            });

            if (conversation) {
                try {
                    const allMessages = await Promise.all(
                        conversation.messages.map(async (messageId) => {
                            return await Message.findById(messageId)
                        })
                    );

                    return res.status(200).json({
                        chats: allMessages,
                    });


                } catch (error) {
                    return res.status(500).json({
                        error: "Failed to fetch messages",
                    });
                }
            }

            return res.status(200).json({ message: "Conversation is not available!!" })

        } catch (error) {
            console.log(error);
        }
    }
];

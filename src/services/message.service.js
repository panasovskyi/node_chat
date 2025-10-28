import { Message } from '../models/index.js';

const getAllMessages = async () => {
  const messages = await Message.findAll();

  return messages;
};

const createMessage = async (userId, login, roomId, text) => {
  const newMessage = await Message.create({
    authorId: userId,
    authorName: login,
    roomId,
    text,
  });

  return newMessage;
};

export const messageService = {
  getAllMessages,
  createMessage,
};

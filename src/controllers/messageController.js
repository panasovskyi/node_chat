import { ApiError } from '../exceptions/api.error.js';
import { User } from '../models/index.js';
import { messageService } from '../services/message.service.js';

const get = async (req, res) => {
  const { roomId } = req.query;
  const id = Number(roomId);

  if (isNaN(id)) {
    throw new ApiError.badRequest('Invalid roomId');
  }

  const messages = await messageService.getMessagesByRoom(id);

  res.status(200).json(messages);
};

const create = async (req, res) => {
  const { message, roomId } = req.body;
  const userId = req.user.id;
  const login = req.user.login;

  const isUser = await User.findOne({ where: { id: userId, login } });

  if (!isUser) {
    throw ApiError.notFound({
      user: 'User not found',
    });
  }

  if (!roomId || isNaN(roomId)) {
    throw ApiError.notFound({
      room: 'Invalid or missing roomId',
    });
  }

  if (!message?.trim()) {
    throw ApiError.badRequest({
      message: 'Message cannot be empty',
    });
  }

  const newMessage = await messageService.createMessage(
    userId,
    login,
    roomId,
    message,
  );

  res.status(201).json(newMessage);
};

export const messageController = {
  get,
  create,
};

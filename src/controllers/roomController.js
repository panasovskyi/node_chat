import { ApiError } from '../exceptions/api.error.js';
import { Room, UserRoom } from '../models/index.js';
import { roomService } from '../services/room.service.js';
import { userRoomService } from '../services/userRoom.service.js';

const create = async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user.id;

  const room = await Room.findOne({ where: { name } });

  if (room) {
    throw ApiError.badRequest({ message: 'This name is already taken' });
  }

  const newRoom = await roomService.createRoom(name, ownerId);

  await userRoomService.createUserRoom(newRoom.id, ownerId);

  res.status(201).json({ room: newRoom });
};

const get = async (req, res) => {
  const allRooms = await roomService.getAllRooms();

  res.status(200).json(allRooms);
};

const getUserRooms = async (req, res) => {
  const userRooms = await UserRoom.findAll();

  res.status(200).json(userRooms);
};

const join = async (req, res) => {
  const userId = req.user.id;
  const name = req.body.name;
  const room = await roomService.findRoomByName(name);

  if (!room) {
    throw ApiError.badRequest({
      room: 'Room you want to join does not exist',
    });
  }

  /* const edit = async (req, res) => {
  const { roomId } = req.params;
  const name = req.body.name;

} */

  /* const existing = await UserRoom.findOne({
    where: { userId, roomId: room.id },
  });

  if (existing) {
    throw ApiError.badRequest({ room: 'You are already in this room' });
  } */

  await userRoomService.createUserRoom(room.id, userId);

  res.status(200).json({ message: 'You have successfully joined the room' });
};

export const roomController = {
  create,
  get,
  getUserRooms,
  join,
};

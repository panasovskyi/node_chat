import { Room } from '../models/index.js';

const createRoom = async (name, ownerId) => {
  const room = await Room.create({ name, ownerId });

  return room;
};

const findRoomByName = async (name) => {
  const room = await Room.findOne({ where: { name } });

  return room;
};

const getAllRooms = async () => {
  const rooms = await Room.findAll();

  return rooms;
};

export const roomService = {
  createRoom,
  findRoomByName,
  getAllRooms,
};

import { sequelize } from '../utils/db.js';
import { User } from './user.model.js';
import { Room } from './room.model.js';
import { Message } from './message.model.js';
import { UserRoom } from './userRoom.model.js';
import { Token } from './token.model.js';

User.hasMany(Message, { foreignKey: 'authorId' });
Message.belongsTo(User, { foreignKey: 'authorId' });

Room.hasMany(Message, { foreignKey: 'roomId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });

User.hasMany(Room, { foreignKey: 'ownerId' });
Room.belongsTo(User, { foreignKey: 'ownerId' });

User.belongsToMany(Room, { through: UserRoom, foreignKey: 'userId' });
Room.belongsToMany(User, { through: UserRoom, foreignKey: 'roomId' });

export { sequelize, User, Room, Message, UserRoom, Token };

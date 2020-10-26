const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, default: 'TASK' },
    order: { type: Number, default: 0 },
    description: { type: String, default: 'description' },
    userId: { type: String, default: '0' },
    boardId: { type: String, default: '0' },
    columnId: { type: String, default: '0' }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

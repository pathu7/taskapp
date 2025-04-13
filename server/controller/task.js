const mongoose = require("mongoose");
const Task = require("../models/task");

exports.addtask = async (req, res) => {
  try {
    const taskSave = await new Task(req.body).save();
    const taskData = await Task.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(taskSave._id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "assignId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          assignId: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          assignName: {
            $ifNull: [{ $arrayElemAt: ["$userData.name", 0] }, ""],
          },
        },
      },
    ]);
    res.status(201).json(taskData[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.task = async (req, res) => {
  try {
    const taskData = await Task.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "assignId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          assignId: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          assignName: {
            $ifNull: [{ $arrayElemAt: ["$userData.name", 0] }, ""],
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(201).json(taskData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deletetask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "delete" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error });
  }
};

exports.statusTask = async (req, res) => {
  try {
    await Task.updateOne(
      { _id: req.body._id },
      { $set: { status: req.body.status } }
    );
    res.status(201).json({ message: "update" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error });
  }
};

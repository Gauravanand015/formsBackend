const mongoose = require("mongoose")


const formTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: String, required: true }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const FormTemplate = mongoose.model('FormTemplate', formTemplateSchema);

module.exports = { FormTemplate }


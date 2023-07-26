const express = require("express");
const { FormTemplate } = require("../models/question.model");
const { authenticateUser } = require("../middleware/authentication");

const formRoute = express.Router();

// Create a new form template
formRoute.post("/form-templates", authenticateUser, async (req, res) => {
  const { title, questions } = req.body;
  const createdBy = req.userId;
  //   console.log(req.body)
  try {
    const newFormTemplate = new FormTemplate({ title, questions, createdBy });
    await newFormTemplate.save();
    res.status(201).json(newFormTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the form template." });
  }
});

// Get all form templates
formRoute.get("/form-templates", async (req, res) => {
  try {
    const formTemplates = await FormTemplate.find().populate(
      "createdBy",
      "username"
    );
    res.json(formTemplates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching form templates." });
  }
});

// Get a specific form template by ID
formRoute.get("/form-templates/:id", async (req, res) => {
  const { id } = req.params;
    console.log(id)
  try {
    const formTemplate = await FormTemplate.findById(id).populate(
      "createdBy",
      "username"
    );
    if (!formTemplate) {
      return res.status(404).json({ error: "Form template not found." });
    }
    res.json(formTemplate);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the form template." });
  }
});

// Update a form template
formRoute.put("/form-templates/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;
  const createdBy = req.userId;
  console.log(req.body);
  try {
    const updatedFormTemplate = await FormTemplate.findOneAndUpdate(
      { _id: id, createdBy },
      { title, questions },
      { new: true }
    );
    if (!updatedFormTemplate) {
      return res.status(404).json({ error: "Form template not found." });
    }
    res.json(updatedFormTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the form template." });
  }
});

// Delete a form template
formRoute.delete("/form-templates/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const createdBy = req.userId;

  try {
    const deletedFormTemplate = await FormTemplate.findOneAndDelete({
      _id: id,
      createdBy,
    });
    if (!deletedFormTemplate) {
      return res.status(404).json({ error: "Form template not found." });
    }
    res.json({ message: "Form template deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the form template." });
  }
});

module.exports = { formRoute };

import express from 'express';
import { createContact } from '../controllers/contact.controller.js';

const router = express.Router();

// Route to create a new contact
router.post('/create', createContact);

export default router;
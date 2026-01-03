import express from 'express';
import { createContact, getContacts, deleteContact } from '../controllers/contact.controller.js';

const router = express.Router();

// Route to create a new contact
router.post('/create', createContact);
router.get('/all', getContacts);
router.delete('/delete/:id', deleteContact);


export default router;
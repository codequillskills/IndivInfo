import express from 'express';
import { authorizeUser } from '../middlewares/auth.js';
import { addUserContact, getUserContacts, updateUserContact, deleteUserContact } from '../controllers/userContactController.js';

const router = express.Router();

router.post('/', authorizeUser, addUserContact);
router.get('/', authorizeUser, getUserContacts);
router.put('/:id', authorizeUser, updateUserContact);
router.delete('/:id', authorizeUser, deleteUserContact);


export default router;
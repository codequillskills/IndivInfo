import UserContact from '../models/userContactModel.js';

export const getUserContacts = async (req, res) => {
    try {
        const userId = req.user.userId;

        const userContacts = await UserContact.find({ user: userId });
        console.log('Found contacts:', userContacts);
        res.json(userContacts);
    } catch (error) {
        console.error('Error fetching contacts:', error.message);
        res.status(500).send('Server Error');
    }
};

export const addUserContact = async (req, res) => {
    try {
        const { name, phoneNumber, email, description, tags } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const userId = req.user.userId;

        const newContact = new UserContact({
            user: userId,
            name,
            phoneNumber: phoneNumber,
            email: email,
            description,
            tags: Array.isArray(tags) ? tags : []
        });

        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ message: 'Error adding contact', error: error.message });
    }
};

export const updateUserContact = async (req, res) => {
    try {
        const userId = req.user.userId;
        const contact = await UserContact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        if (contact.user.toString() !== userId) {
            return res.status(401).json({ message: 'Not authorized to update this contact' });
        }

        if (req.body.email === '') {
            req.body.email = null;
        }

        if (req.body.phoneNumber === '') {
            req.body.phoneNumber = null;
        }

        const updatedContact = await UserContact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: 'Error updating contact', error: error.message });
    }
};

export const deleteUserContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.user.userId;

        const contact = await UserContact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        if (contact.user.toString() !== userId) {
            return res.status(401).json({ message: 'Not authorized to delete this contact' });
        }

        await UserContact.findByIdAndDelete(contactId);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

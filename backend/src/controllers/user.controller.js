import User from '../models/user.model.js';

// SHOW USER WITHOUT PASSWORDS
export const getUsersProfile = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE THE PROFILE
export const updateUserProfile = async (req, res) => {
    const { id } = req.params
    const { username, email, password } = req.body
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User profile update successfully",
            user
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};



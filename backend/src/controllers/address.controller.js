import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// ADD A NEW ADDRESS
export const addAddress = async (req, res) => {
    const { id } = req.params;
    const { fullName, street, city, country, zip, phone, isDefault } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "user not found" });

        const address = { fullName, street, city, country, zip, phone, isDefault: !!isDefault };

        // IF IT IS THE FIRTS, TURN TO DEFAULT
        if (user.addresses.length === 0) {
            address.isDefault = true;
        }

        // IF IT IS MARKED AS DEFAULT, UNCHEKED THE OTHERS
        if (address.isDefault) {
            user.addresses.forEach(a => a.isDefault = false);
        }

        // ADD THE ADDRESS 
        user.addresses.push(address);
        await user.save()

        res.status(200).json({
            message: "Added Address",
            address: user.addresses[user.addresses.length - 1]
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

// UPDATE AN ADDRESS
export const updateAddress = async (req, res) => {
    const { addressId, id } = req.params;
    const { fullName, street, city, country, zip, phone, isDefault } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "user not found" });

        const addr = user.addresses.id(addressId)
        if (!addr) return res.status(404).json({ message: "address not found" });

        // update the fields in the body
        if (fullName) addr.fullName = fullName;
        if (street) addr.street = street;
        if (city) addr.city = city;
        if (country) addr.country = country;
        if (zip) addr.zip = zip;
        if (phone) addr.phone = phone;

        // DEFAULT
        if (isDefault) {
            user.addresses.forEach(a => a.isDefault = false)
            addr.isDefault = true;
        }

        await user.save()
        res.json({ message: 'address update', address: addr });


    } catch (err) {
        res.status(500).json({ messsage: err.message })
    }
};

// REMOVE AN ADDRESS
export const deleteAddress = async (req, res) => {
    const { addressId, id } = req.params
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "user not found" });

        const addr = user.addresses.id(addressId);
        if (!addr) return res.status(404).json({ message: "address not found" });

        const wasDefault = addr.isDefault;
        addr.remove();

        // if we delete the default, we mark the firts one as default
        if (wasDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true;
        }
        await user.save()
        res.status(200).json({ message: 'address deleted' });


    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// MARK AN ADDRESS AS DEFAULT
export const setDefaultAddress = async (req, res) => {
    const { addressId, id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ message: "user not found" })

        const addr = user.addresses.id(addressId)
        if (!addr) return res.status(404).json({ message: "user not found" });

        // Manejo de default
        if (isDefault) {
            user.addresses.forEach(a => a.isDefault = false);
            addr.isDefault = true;
        }

        await user.save();
        res.json({ message: 'Address updated', address: addr });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

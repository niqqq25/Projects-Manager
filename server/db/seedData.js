import bcrypt from 'bcryptjs';

import mongodb from 'mongodb';
const ObjectID = mongodb.ObjectID;

async function seedData(db, collectionName, data) {
    if (collectionName === 'users') {
        data = await Promise.all(
            data.map(async user => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return Object.assign({}, user, { password: hashedPassword });
            })
        );
    }

    data = data.map(d => Object.assign({}, d, { _id: new ObjectID(d._id) }));

    await db.collection(collectionName).insertMany(data);
}

export default seedData;

import bcrypt from "bcrypt";

async function seedData(db, collectionName, data) {
    if(collectionName === "users"){
        data = await Promise.all(
            data.map(async user => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return Object.assign({}, user, { password: hashedPassword });
            })
        );
    }
    await db.collection(collectionName).insertMany(data);
}

export default seedData;
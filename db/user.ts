import prisma from './index';
import bcrypt from 'bcrypt';

const saltRounds = 10;

async function createUser() {
    try {
        const plainPassword = "plainpassword123";

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        const newUser = {
            username: "testuser",
            email: "testuser@example.com",
            password: hashedPassword,
            avatar: "https://example.com/avatar.jpg", // optional
        };

        interface User {
            id: number;
            username: string;
            email: string;
            password: string;
            avatar?: string | null;
        }

        const user: User = await prisma.users.create({
            data: newUser as User,
        });

        console.log("Success... a new user was created!!");
        console.log(user);

    } catch (error) {
        console.log("Something went wrong...");
        console.error(error);
    }
}

createUser();

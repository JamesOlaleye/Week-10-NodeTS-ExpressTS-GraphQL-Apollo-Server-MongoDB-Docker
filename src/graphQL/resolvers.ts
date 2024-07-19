import Note from '../model/noteModel';
import User from '../model/userModel';
import bcrypt from 'bcrypt';


interface SignUpUser {
    fullName: string;
    email: string;
    gender: string;
    phone: string;
    address: string;
    password: string;
}

interface GetUser {
    id: string;
}
export interface GetInput {
    input: GetUser
}

interface CreateUser {
    input: SignUpUser
}

// export interface UpdateUser {
//     id: string;
//     fullName?: string;
//     email?: string;
//     password?: string;
//     age?: number;
// }

const resolvers = {
    Query: {
        Users: async () => {
            const users = await User.find({});
            return users;
        },

        User: async (_parent: unknown, args: GetInput, _context: unknown) => {
            const { id } = args.input;
            const user = await User.findById(id);
            return user;
        },
        Notes: async () => {
            const notes = await Note.find({});
            return notes;
        },
        Note: async (_parent: unknown, args: { id: any }, _context: unknown) => {
            const id = args.id
            const note = await Note.findById(id);
            return note;
        },
    },
    Mutation: {
        signup: async (parent: unknown, args: { input: SignUpUser }, _context: unknown) => {
            const { password } = args.input;
            const encrypt = await bcrypt.hash(password, 10);
            const user = await User.create({ ...args.input, password: encrypt });
            return user;
        },
        login: async (parent: unknown, args: { input: { email: string, password: string } }, _context: unknown) => {
            const { email, password } = args.input;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            return user;
        },
        createNote: async (parent: unknown, args: { input: any }, _context: unknown) => {
            const note = await Note.create(args.input);
            return note;
        },
        updateNote: async (parent: unknown, args: { id: string, input: any }, _context: unknown) => {
            const note = await Note.findByIdAndUpdate(args.id, args.input, { new: true });
            return note;
        },
        deleteNote: async (parent: unknown, args: { id: string }, _context: unknown) => {
            const note = await Note.findByIdAndDelete(args.id);
            return note;
        }

    }
}
export default resolvers
import { Users } from './model';

interface IUser {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
}

function modifyUser(user: any) {
    // remove "undefined" fields if there is any
    // this behaviour is due to the user when he
    // don't change those fields (they have no value)
    for (const prop in user) {
        if (typeof user[prop] == 'undefined') delete user[prop];
    }

    return Users.findByIdAndUpdate(user._id, user, {new: true});
}

// mutation {
//     createUser(name: "Mock", lastName: "User", email: "add@com", password: "8978", birthDate: "09/09/1973") {
//         _id
//         name
//         lastName
//     }
// }


export const resolvers = {
    Query: {
        users: () => Users.find(),
        user: (_: any, {id}: any) => Users.findById(id)
    },
    Mutation: {
        createUser: (_: any, user: IUser) =>
                Users.create({
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    birthDate: user.birthDate
                }),
        updateUser: (_: any, user: IUser) => modifyUser(user),
        deleteUser: (_: any, {_id}: any) => Users.findByIdAndRemove(_id)
    }
};

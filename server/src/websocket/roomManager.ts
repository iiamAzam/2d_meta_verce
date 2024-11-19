import  User  from "./user";

export class Roommanager {
    public rooms: Map<string, User[]> = new Map();
    private static instance: Roommanager;

    private constructor() {

    }

    public static getInstance(): Roommanager {
        if (!Roommanager.instance) {
            Roommanager.instance = new Roommanager();
        }
        return Roommanager.instance;
    }

    /**
     * Add a user to a space
     * @param spaceId Space identifier
     * @param user User to add
     * @returns boolean indicating success
     */
    public addUser(spaceId: string, user: User): boolean {
        try {
            if (!spaceId || !user) {
                throw new Error('Invalid spaceId or user');
            }

            if (!this.rooms.has(spaceId)) {
                this.rooms.set(spaceId, [user]);
            } else {
                const existingUsers = this.rooms.get(spaceId);
                if (!existingUsers) {
                    this.rooms.set(spaceId, [user]);
                } else {
                    // Check if user already exists
                    if (!existingUsers.some(u => u.id === user.id)) {
                        existingUsers.push(user);
                        this.rooms.set(spaceId, existingUsers);
                    }
                }
            }
            return true;
        } catch (error) {
            console.error('Error adding user to space:', error);
            return false;
        }
    }

    /**
     * Remove a user from a space
     * @param user User to remove
     * @param spaceId Space identifier
     * @returns boolean indicating success
     */
    public removeUser(user: User, spaceId: string): boolean {
        try {
            if (!spaceId || !user) {
                throw new Error('Invalid spaceId or user');
            }

            if (!this.rooms.has(spaceId)) {
                return false;
            }

            const existingUsers = this.rooms.get(spaceId);
            if (!existingUsers) {
                return false;
            }

            const filteredUsers = existingUsers.filter(u => u.id !== user.id);

            // If space is empty after removing user, delete the space
            if (filteredUsers.length === 0) {
                this.rooms.delete(spaceId);
            } else {
                this.rooms.set(spaceId, filteredUsers);
            }

            return true;
        } catch (error) {
            console.error('Error removing user from space:', error);
            return false;
        }
    }

    /**
     * Broadcast a message to all users in a space except the sender
     * @param message Message to broadcast
     * @param spaceId Space identifier
     * @param sender User sending the message
     * @returns boolean indicating success
     */
    public broadcast(message: any, spaceId: any, sender: User): boolean {
        try {
            if (!spaceId || !sender || !message) {
                throw new Error('Invalid parameters for broadcast');
            }

            // Fixed the logic (was returning when room exists, which is opposite of intended behavior)
            if (!this.rooms.has(spaceId)) {
                return false;
            }

            const users = this.rooms.get(spaceId);
            if (!users) {
                return false;
            }

            users.forEach((user) => {
                if (user.id !== sender.id) {
                    try {
                        user.socket.emit('message', message);
                    } catch (error) {
                        console.error(`Failed to send message to user ${user.id}:`, error);
                    }
                }
            });

            return true;
        } catch (error) {
            console.error('Error broadcasting message:', error);
            return false;
        }
    }

    /**
     * Get all users in a space
     * @param spaceId Space identifier
     * @returns Array of users or null if space doesn't exist
     */
    public getUsers(spaceId: string): User[] | null {
        return this.rooms.get(spaceId) || null;
    }

    /**
     * Get number of users in a space
     * @param spaceId Space identifier
     * @returns Number of users
     */
    public getUserCount(spaceId: string): number {
        return this.rooms.get(spaceId)?.length || 0;
    }

    /**
     * Check if a space exists
     * @param spaceId Space identifier
     * @returns boolean indicating if space exists
     */
    public hasSpace(spaceId: string): boolean {
        return this.rooms.has(spaceId);
    }

    /**
     * Clear all rooms (useful for testing)
     */
    public clear(): void {
        this.rooms.clear();
    }
}

















































//  import { User } from "./user"

// export class Roommanager{
//         rooms:Map<string, User[]>=new Map()
//         static instatance:Roommanager;
//         private constructor (){
//             this.rooms=new Map()
//         }
//         static getinstatance(){
//                 if(!this.instatance){
//                     this.instatance=new Roommanager()
//                 }
//                 return this.instatance
//         }
//         adduser(spaceId:string,user:User){
//                 if(!this.rooms.has(spaceId)){
//                     this.rooms.set(spaceId,[user])
//                     return
//                 }
//         }
//         removeuser(user:User,spaceId:any){
//             if(!this.rooms.has(spaceId)){
//                 return
//             }
//             this.rooms.set(spaceId,(this.rooms.get(spaceId)?.filter(u=>u.id!==user.id)??[]))
//             return}
//             broadcast (message:any, roomid:any,user:User){
//                     if(this.rooms.has(roomid)){
//                         return
//                     }
//                     this.rooms.get(roomid)?.forEach((u)=>{
//                         if(u.id!==user.id){
//                             u.socket.send(message)
//                         }
//                     })

//                 }
//      }

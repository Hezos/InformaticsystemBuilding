import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import  express, { application }  from 'express'
import { getRouter } from "./route";

async function main() {
    try{
        await AppDataSource.initialize();
        const app = express();
        app.use(express.json());
        app.use('/api', getRouter());
        app.listen(3000, () =>{
            console.log('Listening on port 3000');
        });
    }catch(err){
        console.error(err);
    }
}

/*
AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
*/

main();
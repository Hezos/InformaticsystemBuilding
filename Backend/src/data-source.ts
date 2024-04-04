import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Place } from "./entity/Place"
import { Donor } from "./entity/Donor"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Place, Donor],
    migrations: [],
    subscribers: [],
})

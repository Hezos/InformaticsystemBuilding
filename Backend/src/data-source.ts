import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Place } from "./entity/Place"
import { Donor } from "./entity/Donor"
import { Donation } from "./entity/Donation"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "Clinic",
    synchronize: true,
    logging: false,
    entities: [User, Place, Donor, Donation],
    migrations: [],
    subscribers: [],
})

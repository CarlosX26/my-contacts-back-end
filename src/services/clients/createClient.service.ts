import { Client } from "./../../entities/client.entity";
import {
  IClient,
  IClientWithoutPassword,
} from "../../interfaces/client.interface";
import { clientWithoutPasswordSchema } from "../../schemas/client.schema";
import AppDataSource from "../../data-source";

const createClientService = async (
  payload: IClient
): Promise<IClientWithoutPassword> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientInstance = clientRepo.create(payload);

  const clientSaved = await clientRepo.save(clientInstance);

  const clientWithoutPassword = clientWithoutPasswordSchema.parse(clientSaved);

  return clientWithoutPassword;
};

export default createClientService;

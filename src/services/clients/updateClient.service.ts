import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import AppError from "../../errors/appError";
import {
  IClientUpdate,
  IClientWithoutPassword,
} from "../../interfaces/client.interface";
import { clientWithoutPasswordSchema } from "../../schemas/client.schema";

const updateClientService = async (
  clientId: string,
  payload: IClientUpdate
): Promise<IClientWithoutPassword> => {
  const clientRepo = AppDataSource.getRepository(Client);

  if (!Object.keys(payload).length) {
    throw new AppError("Need to pass at least one field to update.");
  }

  const client = await clientRepo.findOneBy({ id: clientId });

  const clientUpdated = await clientRepo.save({ ...client, ...payload });

  const clientWithoutPassword =
    clientWithoutPasswordSchema.parse(clientUpdated);

  return clientWithoutPassword;
};

export default updateClientService;

import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientWithoutPassword } from "../../interfaces/client.interface";
import { clientWithoutPasswordSchema } from "../../schemas/client.schema";

const readClientService = async (
  clientId: string
): Promise<IClientWithoutPassword> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const client = await clientRepo.findOneBy({ id: clientId });

  const clientWithoutPassword = clientWithoutPasswordSchema.parse(client);

  return clientWithoutPassword;
};

export default readClientService;

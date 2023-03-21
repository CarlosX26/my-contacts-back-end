import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";

const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepo = AppDataSource.getRepository(Client);

  await clientRepo.delete({
    id: clientId,
  });
};

export default deleteClientService;

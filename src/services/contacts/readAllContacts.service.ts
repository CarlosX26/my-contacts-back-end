import { Contact } from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import "dotenv/config";

const readAllContactsService = async (
  userAuthId: string
): Promise<Contact[]> => {
  const contactRepo = AppDataSource.getRepository(Contact);

  const allContacts = await contactRepo.find({
    where: {
      client: {
        id: userAuthId,
      },
    },
  });
  return allContacts;
};

export default readAllContactsService;

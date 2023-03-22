import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const deleteContactService = async (contact: Contact): Promise<void> => {
  const contactRepo = AppDataSource.getRepository(Contact);

  await contactRepo.delete({
    id: contact.id,
  });
};
export default deleteContactService;

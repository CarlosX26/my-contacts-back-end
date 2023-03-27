import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { IClientUpdate } from "../../interfaces/client.interface";

const updateContactService = async (
  contact: Contact,
  payload: IClientUpdate
): Promise<any> => {
  const contactRepo = AppDataSource.getRepository(Contact);

  const updateContact = await contactRepo.save({ ...contact, ...payload });

  return updateContact;
};

export default updateContactService;

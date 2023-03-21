import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import { IContact, IContactReturn } from "../../interfaces/contact.interface";
import { contactReturnSchema } from "../../schemas/contact.schema";

const createContactService = async (
  userAuthId: string,
  payload: IContact
): Promise<IContactReturn> => {
  const clientRepo = AppDataSource.getRepository(Client);
  const contactRepo = AppDataSource.getRepository(Contact);

  const client = await clientRepo.findOneBy({ id: userAuthId });

  const contactInstance = contactRepo.create({
    ...payload,
    client: { ...client },
  });

  const contactSaved = await contactRepo.save(contactInstance);

  const contactReturn = contactReturnSchema.parse(contactSaved);

  return contactReturn;
};

export default createContactService;

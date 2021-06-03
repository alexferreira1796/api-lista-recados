import { v4 as uuidv4 } from 'uuid';

class Messages {
  protected id: string;
  protected description: string;
  protected details: string;

  constructor(desc: string, details: string) {
    this.id = uuidv4();
    this.description = desc;
    this.details = details;
  }

  getId() {
    return this.id;
  }

}

export default Messages;
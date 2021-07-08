export class ContactModel {
  public id?: number;
  public sender_id: number;
  public receiver_id: number;
  public text: string;
  public created_at?: string;
  public updated_at?: string;
}

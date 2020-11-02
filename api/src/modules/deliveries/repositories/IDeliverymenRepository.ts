export default interface IDeliverymenRepository {
  findById(id: string): Promise<{ id: string }>;
}

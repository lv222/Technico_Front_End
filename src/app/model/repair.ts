export interface Repair {
  vat: string;
  propertyItemId: string;
  id: string;
  repairDate: Date;
  typeOfRepair: string;
  description: string;
  address: string;
  status: 'Pending' | 'Complete' | 'InProgress';

  cost: number;
}

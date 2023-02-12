export interface Address {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  [key: string]: any; // Allows me to use square bracket notation to access properties of Address
}

export interface ColumnOption {
  id: number;
  name: string;
  label: string;
  type: string;
  isSortable?: boolean;
}
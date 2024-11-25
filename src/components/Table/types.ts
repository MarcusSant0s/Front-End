// types.ts
export interface Role {
    id: number;
    name: string;
  }
  
  export interface Collaborator {
    id?: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    cpf: string;
    role: Role;
  }
  
  export interface Product{
    id?: number;
    description: string;
    serialNumber: string;
    active: Boolean;
  }
  export interface Stock {
    id?: number;
    stockName: string; 
  }

  export interface Role {
    id: number;
    name: string;
  }
  
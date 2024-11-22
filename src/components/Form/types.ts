export interface Role {
    id: number;
    name: string;
  }
  
  export interface Collaborator {
    id?: number;
    name: string;
    lastName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    role: Role;
  }
  
  export interface Product{
    id?: number;
    description: string;
    serialNumber: string;
  }

  export interface Stock {
    idStock?: number;
    stockName: string;
  }
  
  export interface StockFormProps {
    onClose: () => void;
    onSave: () => void;
    existingStock?: Stock; // Agora o tipo Stock está corretamente definido ou importado
  }
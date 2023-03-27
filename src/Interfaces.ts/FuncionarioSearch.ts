 

export interface Empresa {
    id: number;
    razonSocial: string;
    nombreComercial: string;
    ruc: string;
    telefono: string;
    email: string;
  }

export interface FuncionarioSearch {
    id: number;
    nroTarjeta: string;
    nombre: string;
    ci: string;
    tipoIps: string;
    concat: string;
  }
  
  export interface Sucursal { 

      id: number;
      empresas: Empresa;
      direccion: string;
      telefono: string;
      email: string;
      descripcion: string;
      concat: string;
      patronal:string; 
  }
  

  export interface Sector { 
      id: number;
      empresasId:number; 
    sucursales:Sucursal;
    descripcion: string; 
    esComercial: string;
    subSectors?:SubSector[]
}

export interface SubSector { 
    id: number;
    sector:Sector; 
    descripcion: string;  
}
 
export interface Localidad { 
    id: number;
    descripcion: string;  
    barrios:Barrio[]; 
}
export interface Barrio { 
    id: number;
    descripcion: string;  
    localidad:Localidad
}
export interface Estadocivil { 
    id: number;
    descripcion: string;  
}
export interface Pais { 
    id: number;
    descripcion: string;  
}
 
export interface Nacionalidad { 
    id: number;
    descripcion: string;  
}
 
 
  
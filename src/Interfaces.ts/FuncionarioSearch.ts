 
export interface OpcionSelect {
    label: string,
    value: string,
    item: any,
    options?: [],
    style?: { backgroundColor: string },
}
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
    subSectors:SubSector[]
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
export interface OptionSelectComponent { 
    value: string;
    label: string;  
 }
export interface Estadocivil { 
    id: number;
    descripcion: string;  
}
export interface Pais { 
    id: number;
    descripcion: string;  
}
export interface Seleccion { 
    id: number;
    descripcion: string;  
} 
export interface Nacionalidad { 
    id: number;
    descripcion: string;  
}
export interface Categoria { 
    id: number;
    descripcion: string;  
}
export interface CentroCosto { 
    codigo: string;
    concat: string;  
    empresas: Empresa;
}
export interface Turno { 
    id: number;
    descripcion: string;  
}
export interface FrecuenciaPago { 
    id: number;
    descripcion: string;  
}
export interface TipoEmpleado { 
    id: number;
    descripcion: string;  
}
export interface Sexo { 
    id: string;
    descripcion: string;  
}




export interface Funcionario {
    legajo?:number,
    activo: string;
    anticipo: number;
    barrio?: Barrio;
    bonificacion: string;
    carrera?: Carrera;
    categoria?: Categoria;
    celular: string;
    centroCosto?: CentroCosto;
    ci: string;
    concat: string;
    controlarHorario: string;
    corporativo: string;
    ctaBanco: string;
    direccion: string;
    doctorado: boolean;
    email: string;
    empleadoFamilias: any;
    empresasId: number;
    escolarCompleta: boolean;
    escolarIncompleta: boolean;
    especializacion: boolean;
    estadoCivil?: EstadoCivil;
    estudios: string;
    familiaresEmpresa: string;
    fechaIngreso: string;
    fechaNacimiento: string;
    fechaSalida: string;
    frecuenciaId: any;
    frecuenciaPago?: FrecuenciaPago;
    honorarioActual: number;
    honorariosProfesionales: any;
    horarios?: Horario;
    imagen: string;
    ingresoIps: string;
    salidaIps:string;
    interno: string;
    ipsBase: any;
    lugarNacimiento: string;
    localidad?: Localidad;
    maestria: boolean;
    mediaCompleta: boolean;
    mediaIncompleta: boolean;
    nacionalidad?: Nacionalidad;
    nombre: string;
    nroTarjeta: string;
    observacion: string;
    pais?: Pais;
    path: string;
    personasHijos: any;
    porcentajeIps?: PorcentajeIps;
    postgrado: any;
    salariosDetalle: any;
    salarioActual: number;
    sector?: Sector;
    sectorInt: any;
    semanalFijo: string;
    sexo?: Sexo;
    subSector?: SubSector;
    subSectorInt: any;
    sucursales?: Sucursal;
    telefono: string;
    telefonoFamiliar: string;
    tecnicaturaCompleta: boolean;
    tecnicaturaIncompleta: boolean;
    tipoEmpleado?: TipoEmpleado;
    tipoIps: string;
    turnos?: Turno;
    universitarioCompleto: boolean;
    universitarioIncompleto: boolean;
    viaSeleccion?: ViaSeleccion;
  }
   
  export interface Horario {
    id: number
    turnos: Turno
    subSector: SubSector 
    horaDesde: string
    horaHasta: string
    empresasId: number
    tolerancia: string
    sabEntrada: any
    sabSalida: any
    domEntrada: any
    domSalida: any
    rango: number
    tolMin: number
    tipo: any
    concat: string
    sabado: string
    domingo: string
  }
   

  export interface SiNo {
    id: string
    descripcion: string
  }
export interface EstadoCivil {
    id: number
    descripcion: string
  }
  export interface ViaSeleccion {
    id: number
    descripcion: string
  }

  

export interface PorcentajeIps {
    id: number
    descripcion: string
    porcentaje: number
  }

  export interface Carrera {
    id: number
    descripcion: string
  }
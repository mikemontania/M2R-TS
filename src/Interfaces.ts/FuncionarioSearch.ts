
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
    patronal: string;
}


export interface Sector {
    id: number;
    empresasId: number;
    sucursales: Sucursal;
    descripcion: string;
    esComercial: string;
    subSectors: SubSector[]
}

export interface SubSector {
    id: number;
    sector: Sector;
    descripcion: string;
}

export interface Localidad {
    id: number;
    descripcion: string;
    barrios: Barrio[];
}
export interface Barrio {
    id: number;
    descripcion: string;
    localidad: Localidad
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

export interface empleadoFamilia {
    estadoCivil: EstadoCivil
    fechaNacimiento: string
    id: number
    nombre: string
    observacion: any
    tipoFamilia: TipoFamilia
}


export interface TipoFamilia {
    id: number
    descripcion: string
}



export interface Funcionario {
    id?: number,
    legajo?: number,
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
    empleadoFamilias?: empleadoFamilia[];
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
    honorariosProfesionales?: SalarioDetalle[];
    horarios?: Horario;
    imagen: string;
    ingresoIps: string;
    salidaIps: string;
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
    personasHijos?: PersonaHijo[];
    porcentajeIps?: PorcentajeIps;
    postgrado: any;
    salariosDetalle?: SalarioDetalle[];
    salarioActual: number;
    sector?: Sector;
    sectorInt: any;
    semanalFijo: string;
    sexo?: string;
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
    empresasId: number
    horaDesde: Date | null
    horaHasta: Date | null
    tolerancia: Date | null
    sabEntrada: Date | null
    sabSalida: Date | null
    domEntrada: Date | null
    domSalida: Date | null
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
export interface SalarioDetalle {
    id?: number;
    fecha: string;
    monto: number;
    observacion: string;
    activo: string;
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



export interface PersonaHijo {
    id?: number,
    ci: string,
    estadoCivil: EstadoCivil,
    fechaNacimiento: string,
    nombre: string,
    sexo: string
}







export const SALARIOINICIAL: SalarioDetalle = {
    fecha: new Date().toISOString().slice(0, 10),
    monto: 0,
    observacion: '',
    activo: 'S',
}

export const FUNCIONARIOINICIAL: Funcionario = {

    nroTarjeta: '',
    fechaIngreso: '',
    ingresoIps: '',
    nombre: '',
    ci: '',
    fechaNacimiento: '',
    direccion: '',
    path: '',
    bonificacion: '',
    tipoIps: '',
    concat: '',
    celular: '',
    telefono: '',
    telefonoFamiliar: '',
    lugarNacimiento: '',
    familiaresEmpresa: '',
    controlarHorario: '',
    fechaSalida: '',
    activo: '',
    empresasId: 0,
    salarioActual: 0,
    anticipo: 0,
    observacion: '',
    imagen: '',
    salidaIps: '',
    interno: '',
    corporativo: '',
    escolarCompleta: false,
    escolarIncompleta: false,
    mediaCompleta: false,
    mediaIncompleta: false,
    tecnicaturaCompleta: false,
    tecnicaturaIncompleta: false,
    universitarioCompleto: false,
    universitarioIncompleto: false,
    email: '',
    especializacion: false,
    maestria: false,
    doctorado: false,
    postgrado: null,
    estudios: '',
    ctaBanco: '',
    semanalFijo: '',
    ipsBase: null,
    personasHijos: [],
    empleadoFamilias: [],
    honorariosProfesionales: [],
    sectorInt: null,
    subSectorInt: null,
    frecuenciaId: null,
}; 
 
export interface ConceptosPreciosModel {
     id: number | null,
     activo:string,
    conceptos: Concepto,
    precioConceptoses: PreciosConceptos[]
  }
  
  export interface Concepto {
    id: number
    descripcion: string
    tipoConcepto: number
    conceptosrrhhId: number
    mostrar: number
  }
  
  export interface PreciosConceptos {
    id: number | null,
    subSectorConcepto: number,
    tipoDia: TipoDia,
    cantidadDesde: number,
    cantidadHasta: number,
    horaDesde: Date| null,
    horaHasta: Date| null,
    precio: number,
  }
  
  export interface TipoDia {
    id: number
    descripcion: string
  }
  
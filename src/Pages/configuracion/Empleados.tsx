import { useContext, useState, useEffect, CSSProperties, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../Context/AuthContext';
import { ContextAuthType } from '../../Interfaces.ts/AuthInterface';
import { get, post } from '../../Axios/AxiosService';
import sinImagen from '../../Assets/legajo-sin-imagen.jpg';
import { FuncionarioSearch, Sector, Sucursal, Localidad, Estadocivil, Nacionalidad, Pais, CentroCosto, Categoria, Turno, Seleccion, FrecuenciaPago, TipoEmpleado, Barrio, SubSector, Funcionario, Sexo, Horario, SiNo, PorcentajeIps, Carrera, SalarioDetalle, SALARIOINICIAL, FUNCIONARIOINICIAL } from '../../Interfaces.ts/FuncionarioSearch';
import Select from 'react-select';
import ModalData from '../../Components/ModalData';
import Select3 from '../../Components/Select3';
import Swal from 'sweetalert2';

const style: CSSProperties = {
    width: '242px',
    height: '200px',
};

const sexoArray = [{ id: 'M', descripcion: 'MASCULINO' }, { id: 'F', descripcion: 'FEMENINO' }, { id: 'X', descripcion: 'OTROS' }]

const Empleados = () => {
    const { globalData } = useContext<ContextAuthType>(AuthContext);
    //Search funcionario  
    const [funcionariosSearch, setFuncionariosSearch] = useState<any[]>([]);
    const [funcionarioSearch, setFunSearch] = useState<FuncionarioSearch>();
    const handleSelectChange = async (selectedItem: any) => {
        await setFunSearch(selectedItem);
        getFuncionarioById(selectedItem.id);

    };
    const [funcionario, setFuncionario] = useState<Funcionario>(FUNCIONARIOINICIAL);
    //Tabs
    const [activeTab, setActiveTab] = useState<string>('tab1');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    const onChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFuncionario(prev => ({
            ...prev,
            [event.target.name]: (event.target.value) ? event.target.value : ''
        }))
    }
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = typeof event.target.value === 'string' ? event.target.value.toUpperCase() : event.target.value;
        setFuncionario(prev => ({
            ...prev,
            [event.target.name]: value
        }))
    }
    const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setFuncionario(prev => ({
            ...prev,
            [event.target.name]: event.target.checked
        }))
    };
    //search Nacionalidad
    const [nacionalidades, setNacionalidades] = useState<any[]>([]);
    const [selectedNacionalidad, setNacionalidad] = useState<Nacionalidad>();
    const changeNacionalidad = (selectedItem: any) => {
        setFuncionario(prev => ({ ...prev, ['nacionalidad']: selectedItem      }))
        //setNacionalidad(selectedItem);
    };
    //search Pais
    const [paises, setPaises] = useState<any[]>([]);
    const [selectedPais, setPais] = useState<Pais>();
    const changePais = (selectedItem: any) => {
        setPais(selectedItem);
    };
    //search Localidad
    const [localidades, setLocalidades] = useState<any[]>([]);
    const [selectedLocalidad, setLocalidad] = useState<Localidad>();
    const changeLocalidad = (selectedItem: any) => {
        setLocalidad(selectedItem);
        console.log(selectedItem.value)
        const ciudadActual: Localidad = localidades.find((c: Localidad) => c.id == selectedItem.id)
        console.log(ciudadActual)
        if (ciudadActual?.barrios != null) {
            const barrios = ciudadActual.barrios
            setBarrios(barrios);
        }
    };
    //search barrios
    const [barrios, setBarrios] = useState<any[]>([]);
    const [selectedBarrio, setBarrio] = useState<Barrio>();
    const changeBarrio = (selectedItem: any) => {
        setBarrio(selectedItem);
    };
    //search sector
    const [sectores, setSectores] = useState<any[]>([]);
    const [selectedSector, setSector] = useState<Sector>();
    const changeSector = (selectedItem: any) => {
        setSector(selectedItem);
        const sectorActual: Sector = sectores.find((c: Sector) => c.id == selectedItem.id)
        if (sectorActual.subSectors != null) {
            const subSectors = sectorActual.subSectors
            setSubsectores(subSectors)
        }
    };
    //search subSector
    const [subSectores, setSubsectores] = useState<any[]>([]);
    const [selectedSubSector, setSubSector] = useState<SubSector>();
    const changesubSector = (selectedItem: any) => {
        setSubSector(selectedItem);
    };
    //search EstadosCiviles
    const [estadosCiviles, setEstadosCiviles] = useState<any[]>([]);
    const [selectedEstadoCivil, setEstadoCivil] = useState<Estadocivil>();
    const changeEstadoCivil = (selectedItem: any) => {
        setEstadoCivil(selectedItem);
    };
    //search FrecuenciaPago
    const [frecuenciasPago, setFrecuenciasPago] = useState<any[]>([]);
    const [selectedFrecuenciaPago, setFrecuenciaPago] = useState<FrecuenciaPago>();
    const changeFrecuenciaPago = (selectedItem: any) => {
        setFrecuenciaPago(selectedItem);
    };
    //search TipoEmpleado
    const [tiposEmpleado, setTiposEmpleado] = useState<any[]>([]);
    const [selectedTipoEmpleado, setTipoEmpleado] = useState<TipoEmpleado>();
    const changeTipoEmpleado = (selectedItem: any) => {
        setTipoEmpleado(selectedItem);
    };
    //search Sexos
    const [sexos, setSexos] = useState<any[]>(sexoArray);
    const [selectedSexo, setSexo] = useState<Sexo>();
    const changeSexo = (selectedItem: any) => {
        setSexo(selectedItem);
    };
    //search centroCosto
    const [centroscostos, setCentroscostos] = useState<any[]>([]);
    const [selectedCentroCosto, setCentroCosto] = useState<CentroCosto>();
    const changeCentroCosto = (selectedItem: any) => {
        setCentroCosto(selectedItem);
    };
    //search sucursal
    const [sucursales, setSucursales] = useState<any[]>([]);
    const [selectedSucursal, setSucursal] = useState<Sucursal>();
    const changeSucursal = (selectedItem: any) => {
        setSucursal(selectedItem);
    };
    //search categorias
    const [categorias, setCategorias] = useState<any[]>([]);
    const [selectedCategoria, setCategoria] = useState<Categoria>();
    const changeCategoria = (selectedItem: any) => {
        setCategoria(selectedItem);
    };
    //search seleccion
    const [selecciones, setSelecciones] = useState<any[]>([]);
    const [selectedSeleccion, setSeleccion] = useState<Seleccion>();
    const changeSeleccion = (selectedItem: any) => {
        setSeleccion(selectedItem);
    };
    //search Turno
    const [turnos, setTurnos] = useState<any[]>([]);
    const [selectedTurno, setTurno] = useState<Turno>();
    const changeTurno = (selectedItem: any) => {
        setTurno(selectedItem);
        console.log(selectedItem);
        if (selectedTurno != null && selectedSubSector != null) {
            getHorarios(selectedTurno.id, selectedSubSector.id)
        }
    };
    //search Horarios
    const [horarios, setHorarios] = useState<any[]>([]);
    const [selectedHorario, setHorario] = useState<Horario>();
    const changeHorario = (selectedItem: any) => {
        setHorario(selectedItem);
    };
    //sino object
    const [siNoList, setSiNoList] = useState<any[]>([{ id: 'S', descripcion: 'SI' }, { id: 'N', descripcion: 'NO' }]);
    //search controlarHorario
    const [selectedControlHorario, setControlHorario] = useState<SiNo>();
    const changeControlHorario = (selectedItem: any) => {
        setControlHorario(selectedItem);
    };
    //search activo
    const [selectedActivo, setActivo] = useState<SiNo>();
    const changeActivo = (selectedItem: any) => {
        setActivo(selectedItem);
    };
    //search FamiliarEmpresa
    const [selectedFamiliarEmpresa, setFamiliarEmpresa] = useState();
    const changeFamiliarEmpresa = (selectedItem: any) => {
        setFamiliarEmpresa(selectedItem);
    };
    //search bonificacion
    const [selectedBonificacion, setBonificacion] = useState();
    const changeBonificacion = (selectedItem: any) => {
        setBonificacion(selectedItem);
    };

    //search TipoIps
    const [tiposIps, setTiposIps] = useState<any[]>([{ id: 'MENSUAL', descripcion: 'MENSUAL' }, { id: 'JORNAL', descripcion: 'JORNAL' }]);
    const [selectedTipoIps, setTipoIps] = useState();
    const changeTipoIps = (selectedItem: any) => {
        setTipoIps(selectedItem);
    };
    //search PorcentajeIps
    const [porcentajesIps, setPorcentajesIps] = useState<any[]>([{ id: '1', descripcion: 'EN BASE AL 9%' }, { id: '2', descripcion: 'EN BASE AL 25,5%' }, { id: '3', descripcion: 'NO POSEE IPS' },]);
    const [porcentajeIps, setPorcentajeIps] = useState<PorcentajeIps>();
    const changePorcentajeIps = (selectedItem: any) => {
        setPorcentajeIps(selectedItem);
    };
    //search centroCosto
    const [carreras, setCarreras] = useState<any[]>([]);
    const [carrera, setCarrera] = useState<Carrera>();
    const changeCarrera = (selectedItem: any) => {
        setCarrera(selectedItem);
    };

    const [personasHijos, setPersonasHijos] = useState<number>(0);
    const [empleadoFamilia, setEmpleadoFamilia] = useState<number>(0);


    const [salariosDetalle, setSalariosDetalle] = useState<SalarioDetalle[]>([]);
    const [salarioItem, setSalarioItem] = useState<SalarioDetalle>(SALARIOINICIAL);
    const [honorarios, setHonorarios] = useState<SalarioDetalle[]>([]);
    const [honorarioItem, setHonorarioItem] = useState<SalarioDetalle>(SALARIOINICIAL);

    const onChangeSalarioItem = (event: ChangeEvent<HTMLInputElement>) => {
        setSalarioItem(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const onChangeHonorarioItem = (event: ChangeEvent<HTMLInputElement>) => {
        setSalarioItem(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const enviarForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Formulario enviado');
        if (funcionario?.id) {
            try {
                const respuesta = put('/private/empleados/' + funcionario);
                getFuncionarioById(funcionario.id);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                post('/private/empleados/' + funcionario).then(resp => {
                    setFuncionario(resp.data);
                    Swal.fire({
                        title: "El funcionario se ha creado con exito!!!",
                        text: "Monto es un campo obligatorio",
                        confirmButtonText: "Aceptar",
                    });
                })

            } catch (error) {
                console.error(error);
            }
        }
    };
    const getFuncionarios = async () => {
        try {
            const response = await get('/private/empleados/porEmpresa/' + globalData?.empresas);
            setFuncionariosSearch(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getFuncionarioById = async (id: number) => {
        try {
            const response = await get('/private/empleados/id/' + id);
            console.log(response.data);
            await setFuncionario(response.data as Funcionario);
        } catch (error) {
            console.error(error);
        }
    }



    const getHorarios = async (turnoid: number, subSectorid: number) => {
        console.log(turnoid, subSectorid)
        try {
            const response = await get('/private/horarios/' + turnoid + '/' + subSectorid);
            console.log(response.data);
            setHorarios(response.data);
            if (funcionario.horarios) {
                setHorario(funcionario.horarios);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const getPaises = async () => {
        try {
            const response = await get('/private/paises/');
            setPaises(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const getSelecciones = async () => {
        try {
            const response = await get('/private/seleccion/');
            setSelecciones(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getNacionalidades = async () => {
        try {
            const response = await get('/private/nacionalidades/');
            setNacionalidades(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getCategorias = async () => {
        try {
            const response = await get('/private/categorias/');
            setCategorias(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const getLocalidad = async () => {
        try {
            const response = await get('/private/localidad/');
            setLocalidades(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getCentroCosto = async () => {
        try {
            const response = await get('/private/centroCosto/');
            setCentroscostos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getCarreras = async () => {
        try {
            const response = await get('/private/carreras/');
            setCarreras(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getSucursales = async () => {
        try {
            const response = await get('/private/sucursales/porEmpresa/' + globalData?.empresas);
            setSucursales(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getSectores = async () => {
        try {
            const response = await get('/private/sector/porEmpresa/' + globalData?.empresas);
            setSectores(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const getEstadosCiviles = async () => {
        try {
            const response = await get('/private/estadoCivil/');
            setEstadosCiviles(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const getFrecuenciaPago = async () => {
        try {
            const response = await get('/private/frecuenciaPago/');
            setFrecuenciasPago(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getTiposEmpleado = async () => {
        console.log('getTiposEmpleado')
        try {
            const response = await get('/private/tipoEmpleado/');
            setTiposEmpleado(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getTurnos = async () => {
        try {
            const response = await get('/private/turnos/listarall/' + globalData?.empresas);
            setTurnos(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getFuncionarios();
        getPaises();
        getNacionalidades();
        getEstadosCiviles()
        getLocalidad();
        getCentroCosto();
        getSucursales();
        getSectores();
        getCategorias();
        getTurnos();
        getSelecciones();
        getTiposEmpleado();
        getFrecuenciaPago();
        getCarreras();
    }, []);

    useEffect(() => {
        (selectedTurno != null && selectedSubSector != null) ? getHorarios(selectedTurno.id, selectedSubSector.id) : null;
    }, [selectedTurno]);

    useEffect(() => {
        setPais(funcionario?.pais);
        setNacionalidad(funcionario?.nacionalidad);
        setSexo((funcionario?.sexo) ? sexos.find(s => s.id == funcionario?.sexo) : '');
        setControlHorario((funcionario?.controlarHorario) ? siNoList.find(s => s.id == funcionario?.controlarHorario) : '');
        setActivo((funcionario?.activo) ? siNoList.find(s => s.id == funcionario?.activo) : '');
        setBonificacion((funcionario?.bonificacion) ? siNoList.find(s => s.id == funcionario?.bonificacion) : '');
        setEstadoCivil(funcionario?.estadoCivil);
        setTurno(funcionario?.turnos);
        setLocalidad(funcionario?.localidad);
        setBarrio(funcionario?.barrio);
        setCentroCosto(funcionario?.centroCosto);
        setCategoria(funcionario?.categoria);
        setSucursal(funcionario?.sucursales);
        setSector(funcionario?.sector);
        setSubSector(funcionario?.subSector);
        setSeleccion(funcionario?.viaSeleccion);
        setFrecuenciaPago(funcionario?.frecuenciaPago);
        setTipoEmpleado(funcionario?.tipoEmpleado);
        setTipoIps((funcionario?.tipoIps) ? tiposIps.find(s => s.id == funcionario?.tipoIps) : '');
        setPorcentajeIps(funcionario?.porcentajeIps);
        setFamiliarEmpresa((funcionario?.familiaresEmpresa) ? siNoList.find(s => s.id == funcionario?.familiaresEmpresa) : '');
        setCarrera(funcionario?.carrera);
        setSalariosDetalle((funcionario?.salariosDetalle) ? funcionario?.salariosDetalle : [])
        console.log(funcionario);

        if (funcionario.personasHijos != null || funcionario.personasHijos != undefined)
            setPersonasHijos(funcionario.personasHijos.length);


        if (funcionario.empleadoFamilias != null || funcionario.empleadoFamilias != undefined)
            setEmpleadoFamilia(funcionario.empleadoFamilias.length);

    }, [funcionario]);



    const [showModalSalario, setShowModalSalario] = useState(false);
    const CloseModalSalario = () => {
        setShowModalSalario(false);
    };
    const OpenModalSalario = () => {
        console.log(showModalSalario)
        setShowModalSalario(true);
    };
    const [showModalHonorario, setShowModalHonorario] = useState(false);
    const CloseModalHonorario = () => {
        setShowModalHonorario(false);
    };
    const OpenModalHonorario = () => {
        setShowModalHonorario(true);
    };

    const guardarSalario = async () => {

        if (salarioItem?.monto < 1) {
            Swal.fire({
                title: "Falta el campo Monto",
                text: "Monto es un campo obligatorio",
                confirmButtonText: "Aceptar",
            });
            return;
        }
        if (salarioItem?.fecha == null || salarioItem?.fecha == '') {
            Swal.fire({
                title: "Falta el campo Fecha",
                text: "Fecha es un campo obligatorio",
                confirmButtonText: "Aceptar",
            });
            return;
        }
        if (funcionario?.id) {
            const agregado = await post('/private/salariosDetalle/' + funcionario.id, salarioItem);
            const historial = await get('/private/salariosDetalle/historial/' + funcionario.id);
            setSalariosDetalle(historial.data);
            var index = (salariosDetalle.length) - 1;
            if (index >= 0) {
                setFuncionario(prev => ({ ...prev, ['salarioActual']: salariosDetalle[index].monto }))
            } else {
                setFuncionario(prev => ({ ...prev, ['salarioActual']: 0 }))
            }
            setSalarioItem(SALARIOINICIAL);

        } else {
            Swal.fire({
                title: "El funcionario no existe",
                text: "Debe guardar el funcionario antes de insertar el salario",
                confirmButtonText: "Aceptar",
            });
            return;
        }

    }

    const guardarHonorario = async () => {

        if (honorarioItem?.monto < 1) {
            Swal.fire({
                title: "Falta el campo Monto",
                text: "Monto es un campo obligatorio",
                confirmButtonText: "Aceptar",
            });
            return;
        }
        if (honorarioItem?.fecha == null || honorarioItem?.fecha == '') {
            Swal.fire({
                title: "Falta el campo Fecha",
                text: "Fecha es un campo obligatorio",
                confirmButtonText: "Aceptar",
            });
            return;
        }
        if (funcionario?.id) {
            const agregado = await post('/private/honorariosProfesionales/' + funcionario.id, honorarioItem);
            const historial = await get('/private/honorariosProfesionales/' + funcionario.id);
            setHonorarios(historial.data);
            var index = (honorarios.length) - 1;
            if (index >= 0) {
                setFuncionario(prev => ({ ...prev, ['honorarioActual']: honorarios[index].monto }))
            } else {
                setFuncionario(prev => ({ ...prev, ['honorarioActual']: 0 }))
            }
            setSalarioItem(SALARIOINICIAL);

        } else {
            Swal.fire({
                title: "El funcionario no existe",
                text: "Debe guardar el funcionario antes de insertar el salario",
                confirmButtonText: "Aceptar",
            });
            return;
        }

    }


    return (
        <>

            <div className='mb-3 card'>
                <div className='card-header-tab card-header-tab-animation card-header'>
                    <div className='card-header-title'>
                        Funcionario
                    </div>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12'>
                            {funcionariosSearch ? (<Select3 options={funcionariosSearch} valueKey="id" labelKey="concat" value={funcionarioSearch} onChange={handleSelectChange} placeholder="Seleccione funcionario"
                            />) : (
                                <div>Cargando...</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <div className='mb-3 card' >
                <div className='card-header-tab card-header'>
                    <div className='card-header-title'>
                        LEGAJO {(funcionario?.legajo ? <span>&nbsp;  N° {funcionario?.legajo}</span> : '')}
                    </div>
                    <ul className='nav '>
                        <li className='nav-item'>
                            <a
                                className={activeTab === 'tab1' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab1')}                              >
                                Datos Personales
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className={activeTab === 'tab2' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab2')}                           >
                                Datos Laborales
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className={activeTab === 'tab3' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab3')}
                            >
                                Datos Familiares
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className={activeTab === 'tab4' ? 'nav-link active' : 'nav-link'} onClick={() => handleTabChange('tab4')}                >
                                Datos Academicos
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='tab-content'>
                    <div className={activeTab === 'tab1' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12' >
                                    <div className=' mt-6 mb-3 card-body d-flex justify-content-center'>
                                        <img src={sinImagen} id='img' alt='Imagen' style={style} />
                                    </div>
                                    <div className=' mt-6 mb-3 card-body d-flex justify-content-center'>
                                        <div className='caption'>
                                            <p>
                                                <input onChange={onChangeInput} type='file' className='form-control' id='uploadedfile' file-model='myFile' placeholder=' ' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <form onSubmit={enviarForm}>
                                        <div className='form-row'>
                                            <div className='col-md-4'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='nombre' className='form-label'>
                                                        Nombres
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='nombre' name='nombre' value={funcionario?.nombre || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ci' className='form-label'>
                                                        C.I.
                                                    </label>
                                                    <input
                                                        type='text'
                                                        className='form-control' onChange={onChangeInput}
                                                        id='ci'
                                                        name='ci'
                                                        value={funcionario?.ci || ''}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='fechaNacimiento' className='form-label'>
                                                        Fecha Nacimiento:
                                                    </label>
                                                    <input onChange={onChangeInput} type='date'
                                                        id='fechaNacimiento'
                                                        name='fechaNacimiento'
                                                        value={funcionario?.fechaNacimiento}
                                                        className='form-control' required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label   className='form-label'>
                                                        Pais de Nacimiento
                                                    </label>
                                                    {paises ? (
                                                        <Select3 options={paises} valueKey="id" labelKey="descripcion" value={selectedPais} onChange={changePais} placeholder="Seleccione pais" />) : (<div>Cargando...</div>)}

                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label  className='form-label'>
                                                        Nacionalidad:
                                                    </label>

                                                    {nacionalidades ? (<Select3 options={nacionalidades} valueKey="id" labelKey="descripcion" value={funcionario?.nacionalidad} onChange={changeNacionalidad} placeholder="Seleccione Nacionalidad"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='lugarNacimiento' className='form-label'>
                                                        Lugar Nacimiento:
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' value={funcionario?.lugarNacimiento || ''}
                                                        id='lugarNacimiento'
                                                        name='lugarNacimiento'
                                                        className='form-control' required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='Localidad' className='form-label'>
                                                        Localidad:
                                                    </label>
                                                    {localidades ? (<Select3 options={localidades} valueKey="id" labelKey="descripcion" value={selectedLocalidad} onChange={changeLocalidad} placeholder="Seleccione Nacionalidad"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='barrio' className='form-label'>
                                                        Barrio:
                                                    </label>
                                                    {barrios ? (<Select3 options={barrios} valueKey="id" labelKey="descripcion" value={selectedBarrio} onChange={changeBarrio} placeholder="Seleccione Barrio"
                                                    />) : (<div>Cargando...</div>)}

                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='direccion' className='form-label'>
                                                        Dirección:
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' id='direccion' name='direccion' className='form-control' value={funcionario?.direccion || ''} required />
                                                </div>
                                            </div>
                                        </div>
 
                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='telefono' className='form-label'>
                                                        Telefono
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='telefono' name='telefono' value={funcionario?.telefono || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='celular' className='form-label'>
                                                        Celular
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='celular' name='celular' value={funcionario?.celular || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='telefonoFamiliar' className='form-label'>
                                                        Telefono Familiar:
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='telefonoFamiliar' name='telefonoFamiliar' value={funcionario?.telefonoFamiliar || ''} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='estadoCivil' className='form-label'>
                                                        EstadoCivil
                                                    </label>
                                                    {estadosCiviles ? (<Select3 options={estadosCiviles} valueKey="id" labelKey="descripcion" value={selectedEstadoCivil} onChange={changeEstadoCivil} placeholder="Seleccione Estado"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='sexo' className='form-label'>
                                                        Sexo
                                                    </label>


                                                    {sexos ? (<Select3 options={sexos} valueKey="id" labelKey="descripcion" value={selectedSexo} onChange={changeSexo} placeholder="Seleccione Estado"
                                                    />) : (<div>Cargando...</div>)}

                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='email' className='form-label'>
                                                        Email
                                                    </label>
                                                    <input onChange={onChangeInput} type='email' id='email' name='email' className='form-control' value={funcionario?.email || ''} required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='form-row'>
                                            <div className='col-md-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='observacion' className='form-label'>
                                                        Especifique si aqueja alguna enfermedad
                                                        (Hipertensión, Hipotensión, Diabetes, Alergia,
                                                        etc.)
                                                    </label>


                                                    <textarea onChange={onChangeTextarea} className='form-control' rows={5} id='observacion' name='observacion' value={funcionario?.observacion || ''} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={activeTab === 'tab2' ? 'tab-pane fade show active' : 'tab-pane fade'}  >
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12' >
                                    <div className=' mt-6 mb-3 card-body d-flex justify-content-center'>
                                        <img src={sinImagen} id='img' alt='Imagen' style={style} />
                                    </div>
                                    <div className=' mt-6 mb-3 card-body d-flex justify-content-center'>
                                        <div className='caption'>
                                            <p>
                                                <input type='file' className='form-control' id='uploadedfile' file-model='myFile' placeholder=' ' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <form onSubmit={enviarForm}>
                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='seleccion' className='form-label'>
                                                        Metodo de Seleccion:
                                                    </label>
                                                    {selecciones ? (<Select3 options={selecciones} valueKey="id" labelKey="descripcion" value={selectedSeleccion} onChange={changeSeleccion} placeholder="Seleccione selección"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='categoria' className='form-label'>
                                                        Cargo:
                                                    </label>
                                                    {categorias ? (<Select3 options={categorias} valueKey="id" labelKey="descripcion" value={selectedCategoria} onChange={changeCategoria} placeholder="Seleccione cargo"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='centroCosto' className='form-label'>
                                                        Centro costo:
                                                    </label>
                                                    {centroscostos ? (<Select3 options={centroscostos} valueKey="codigo" labelKey="concat" value={selectedCentroCosto} onChange={changeCentroCosto} placeholder="Seleccione CentroCosto"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='sucursal' className='form-label'>
                                                        Sucursal
                                                    </label>
                                                    {sucursales ? (<Select3 options={sucursales} valueKey="id" labelKey="descripcion" value={selectedSucursal} onChange={changeSucursal} placeholder="Seleccione sucursal"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='sector' className='form-label'>
                                                        Sector:
                                                    </label>
                                                    {sectores ? (<Select3 options={sectores} valueKey="id" labelKey="descripcion" value={selectedSector} onChange={changeSector} placeholder="Seleccione sector"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='subSector' className='form-label'>
                                                        Sub sector:
                                                    </label>
                                                    {subSectores ? (<Select3 options={subSectores} valueKey="id" labelKey="descripcion" value={selectedSubSector} onChange={changesubSector} placeholder="Seleccione sub sector"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='controlarHorario' className='form-label'>
                                                        Controlar Horario
                                                    </label>
                                                    {siNoList ? (<Select3 options={siNoList} valueKey="id" labelKey="descripcion" value={selectedControlHorario} onChange={changeControlHorario} placeholder="Control Horario"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='turno' className='form-label'>
                                                        Turno:
                                                    </label>
                                                    {turnos ? (<Select3 options={turnos} valueKey="id" labelKey="descripcion" value={selectedTurno} onChange={changeTurno} placeholder="Seleccione Turno"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='horario' className='form-label'>
                                                        Horario:
                                                    </label>
                                                    {horarios ? (<Select3 options={horarios} valueKey="id" labelKey="concat" value={selectedHorario} onChange={changeHorario} placeholder="Seleccione Horario"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                        </div>


                                        <div className='form-row'>

                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='fechaIngreso' className='form-label'>
                                                        Fecha Ingreso:
                                                    </label>
                                                    <input onChange={onChangeInput} type='date' className='form-control' id='fechaIngreso' name='fechaIngreso' value={funcionario?.fechaIngreso || ''} required />

                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='fechaSalida' className='form-label'>
                                                        Fecha Salida:
                                                    </label>
                                                    <input onChange={onChangeInput} type='date' className='form-control' id='fechaSalida' name='fechaSalida' value={funcionario?.fechaSalida || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ctaBanco' className='form-label'>
                                                        Nro cuenta Banco:
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='ctaBanco' name='ctaBanco' value={funcionario?.ctaBanco || ''} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ingresoIps' className='form-label'>
                                                        Ingreso Ips:
                                                    </label>
                                                    <input onChange={onChangeInput} type='date' className='form-control' id='ingresoIps' name='ingresoIps' value={funcionario?.ingresoIps || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='salidaIps' className='form-label'>
                                                        Ingreso Salida:
                                                    </label>
                                                    <input onChange={onChangeInput} type='date' className='form-control' id='salidaIps' name='salidaIps' value={funcionario?.salidaIps || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='interno' className='form-label'>
                                                        Nro Interno:
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='interno' name='interno' value={funcionario?.interno || ''} required />
                                                </div>
                                            </div>

                                        </div>


                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='activo' className='form-label'>
                                                        Activo:
                                                    </label>
                                                    {siNoList ? (<Select3 options={siNoList} valueKey="id" labelKey="descripcion" value={selectedActivo} onChange={changeActivo} placeholder="Seleccione Activo"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='bonificacion' className='form-label'>
                                                        Bonificación:
                                                    </label>
                                                    {siNoList ? (<Select3 options={siNoList} valueKey="id" labelKey="descripcion" value={selectedBonificacion} onChange={changeBonificacion} placeholder="Seleccione Bonificacion"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='corporativo' className='form-label'>
                                                        Nro Corporativo:
                                                    </label>
                                                    <input onChange={onChangeInput} type='text' className='form-control' id='corporativo' name='corporativo' value={funcionario?.corporativo || ''} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='frecuenciaPago' className='form-label'>
                                                        Frecuencia Pago:
                                                    </label>
                                                    {frecuenciasPago ? (<Select3 options={frecuenciasPago} valueKey="id" labelKey="descripcion" value={selectedFrecuenciaPago} onChange={changeFrecuenciaPago} placeholder="Seleccione frecuencia de pago"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='tipoEmpleado' className='form-label'>
                                                        Tipo Empleado:
                                                    </label>
                                                    {tiposEmpleado ? (<Select3 options={tiposEmpleado} valueKey="id" labelKey="descripcion" value={selectedTipoEmpleado} onChange={changeTipoEmpleado} placeholder="Seleccione frecuencia de pago"
                                                    />) : (<div>Cargando...</div>)}
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='tipoIps' className='form-label'>
                                                        Tipo Ips:
                                                    </label>
                                                    <Select3 options={tiposIps} valueKey="id" labelKey="descripcion" value={selectedTipoIps} onChange={changeTipoIps} placeholder="Seleccione tipo ips" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='porcentajeIps' className='form-label'>
                                                        Porcentaje Ips:
                                                    </label>
                                                    <Select3 options={porcentajesIps} valueKey="id" labelKey="descripcion" value={porcentajeIps} onChange={changePorcentajeIps} placeholder="Seleccione % ipse" />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ipsBase' className='form-label'>
                                                        Monto Ips Base:
                                                    </label>
                                                    <input onChange={onChangeInput} type='number' className='form-control' id='ipsBase' name='ipsBase' value={funcionario?.ipsBase || ''} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='anticipo' className='form-label'>
                                                        Monto Anticipo Mensual:
                                                    </label>
                                                    <input onChange={onChangeInput} type='number' className='form-control' id='anticipo' name='anticipo' value={funcionario?.anticipo || ''} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            {(globalData?.rol === 'Informatica' || globalData?.rol === 'Directores') ?

                                                <div className='col-md-4 col-sm-12'>
                                                    <div className="position-relative form-group"><label  >Salario Base</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <button type="button" className=" btn btn-secondary" onClick={OpenModalSalario}>Agregar Salario</button>
                                                            </div>
                                                            <input onChange={onChangeInput} disabled={true} type='number' className='form-control' id='salarioActual' name='salarioActual' value={funcionario?.salarioActual || ''} required />

                                                        </div>
                                                    </div>
                                                </div>
                                                : null
                                            }
                                            {(globalData?.rol === 'Informatica' || globalData?.rol === 'Directores') ?

                                                <div className='col-md-4 col-sm-12'>

                                                    <div className="position-relative form-group">
                                                        <label  >Honorarios profesionales</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <button type="button" className=" btn btn-secondary" onClick={OpenModalHonorario}>Agregar                                                                    Honorario</button>

                                                            </div>
                                                            <input onChange={onChangeInput} disabled={true} type='number' className='form-control' id='honorarioActual' name='honorarioActual' value={funcionario?.honorarioActual || ''} required />

                                                        </div>
                                                    </div>




                                                </div>
                                                : null
                                            }
                                        </div>


                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={activeTab === 'tab3' ? 'tab-pane fade show active' : 'tab-pane fade'} >
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12'>
                                    <div className="position-relative form-group"><label  >Cantidad hijos</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <button type="button" className=" btn btn-secondary"> Modificar datos</button>
                                            </div>
                                            <input onChange={onChangeInput} className="form-control" value={personasHijos}
                                                type="text" id='cantHijos' name='cantHijos'
                                                disabled={true} ui-number-mask="0" />

                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12'>
                                    <div className="position-relative form-group"><label  >Otros familiares</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <button type="button" className=" btn btn-secondary"> Modificar datos</button>
                                            </div>
                                            <input onChange={onChangeInput} className="form-control"
                                                type="text" id='cantHijos' name='cantHijos' value={empleadoFamilia}
                                                disabled={true} ui-number-mask="0" />

                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-4 col-sm-12'>
                                    <div className='position-relative form-group'>
                                        <label htmlFor='familiaresEmpresa' className='form-label'>
                                            Familiares en la empresa:
                                        </label>
                                        <Select3 options={siNoList} valueKey="id" labelKey="descripcion" value={selectedFamiliarEmpresa} onChange={changeFamiliarEmpresa} placeholder="Si/NO" />

                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                    <div className={activeTab === 'tab4' ? 'tab-pane fade show active' : 'tab-pane fade'}     >
                        <div className='card-body'>
                            <div className="row show-grid">
                                <div className="form-group">
                                    <label className="col-md-2 control-label">Grado académico </label>
                                    <div className="col-md-3">
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0"
                                                    checked={funcionario?.escolarCompleta} id="escolarCompleta"
                                                    name="escolarCompleta" />
                                                <span>Educación Escolar Básica (Completa)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0"
                                                    id="mediaCompleta"
                                                    name="mediaCompleta" checked={funcionario?.mediaCompleta} />
                                                <span>Educación Media (Completa)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0"
                                                    id="tecnicaturaCompleta"
                                                    name="tecnicaturaCompleta" checked={funcionario?.tecnicaturaCompleta}
                                                />
                                                <span>Técnicatura (Especificar Área-Completa)</span>
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0"
                                                    id="universitarioCompleto"
                                                    name="universitarioCompleto" checked={funcionario?.universitarioCompleto}
                                                />
                                                <span>Nivel Universitario(Completo)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="checkbox">
                                            <label>
                                                <input id="escolarIncompleta"
                                                    name="escolarIncompleta" onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0"
                                                    checked={funcionario?.escolarIncompleta} />
                                                <span>Educación Escolar Básica (Incompleta)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0" id="mediaIncompleta" name="mediaIncompleta" checked={funcionario?.mediaIncompleta} />
                                                <span>Educación Media (Incompleta)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0" id="tecnicaturaIncompleta" name="tecnicaturaIncompleta" checked={funcionario?.tecnicaturaIncompleta}
                                                />
                                                <span>Técnicatura (Incompleta)</span>
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} type="checkbox" className="checkbox style-0" id="universitarioIncompleto" name="universitarioIncompleto" checked={funcionario?.universitarioIncompleto} />
                                                <span>Nivel Universitario(Incompleto)</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label>Carrera</label>
                                        {carreras ? (<Select3 options={carreras} valueKey="id" labelKey="descripcion" value={carrera} onChange={changeCarrera} placeholder="Seleccione carrera" />) : (<div>Cargando...</div>)}
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label>Especifique si se encuentra cursando actualmente
                                            otros estudios</label>
                                        <textarea onChange={onChangeTextarea} className='form-control' rows={5} id='estudios' name='estudios' value={funcionario?.estudios || ''} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-2 control-label">Post Graduación </label>
                                    <div className="col-md-3">

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox}
                                                    type="checkbox" className="checkbox style-0" id="especializacion"
                                                    name="especializacion"
                                                    checked={funcionario?.especializacion}
                                                />
                                                <span>Especialización</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox}
                                                    type="checkbox" className="checkbox style-0"
                                                    checked={funcionario?.maestria} id="maestria"
                                                    name="maestria"
                                                />
                                                <span>Maestría</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox}
                                                    type="checkbox" className="checkbox style-0"
                                                    checked={funcionario?.doctorado} id="doctorado"
                                                    name="doctorado" />
                                                <span>Doctorado</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label>Descripcion del Post Grado</label>
                                        <input onChange={onChangeInput} type="text" name="postgrado"
                                            value={funcionario?.postgrado || ''}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <button type='submit' className='btn btn-secondary'>
                    Enviar
                </button>
                <button type='submit' className='btn btn-danger'>
                    Cancelar
                </button>

                <ModalData title="Salario" show={showModalSalario} onClose={CloseModalSalario} size="lg">
                    <form id="formSalario" name="formSalario" role="form"  >
                        <div className="modal-body">
                            <fieldset  >
                                <legend>Complete la información del salario</legend>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="form-group">
                                            <label>Fecha</label>
                                            <input type="date" id='fecha' name='fecha' className="form-control" onChange={onChangeSalarioItem} value={salarioItem?.fecha || ''} />
                                        </div>
                                        <div className="form-group">
                                            <label>Monto</label>
                                            <input type="number" id='monto' name='monto' className="form-control" min="0" onChange={onChangeSalarioItem} value={salarioItem?.monto || ''} />
                                        </div>
                                        <div className="form-group">
                                            <label>Observación</label>
                                            <input type="text" id='observacion' name='observacion' className="form-control" onChange={onChangeSalarioItem} value={salarioItem?.observacion || ''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="  group-button">
                                    <button type="button" className="m-1 btn btn-secondary" onClick={guardarSalario}  >Guardar</button>
                                    <button type="button" className="m-1 btn btn-danger" onClick={() => setSalarioItem(SALARIOINICIAL)} data-dismiss="modal">Cancelar</button>
                                </div>
                            </fieldset>
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Monto</th>
                                        <th>Observacion</th>
                                        <th>Estado</th>
                                        <th  ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        salariosDetalle.map(salario =>
                                            <tr key={salario.id}>
                                                <td>{new Date(salario.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                                <td>{salario.monto.toLocaleString('es', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true, currency: 'PYG', style: 'currency', currencyDisplay: 'symbol' })}</td>
                                                <td>{salario.observacion}</td>
                                                {(salario.activo == 'S' ? <td>ACTIVO</td> : <td>ACTIVO</td>)}
                                                <td>
                                                    <button type="button" ng-click="removeSalario(item)" className="btn btn-danger" title="Eliminar">
                                                        <i className="fa fa-trash-o fa-fw"></i>
                                                    </button>
                                                </td>
                                            </tr>)
                                    }
                                </tbody>
                            </table>


                        </div>

                    </form>
                </ModalData>

                <ModalData title="Honorario" show={showModalHonorario} onClose={CloseModalHonorario} size="lg">
                    <form id="formHonorario" name="formHonorario" role="form"  >
                        <div className="modal-body">
                            <fieldset  >
                                <legend>Complete la información del honorario</legend>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="form-group">
                                            <label>Fecha</label>
                                            <input type="date" id='fecha' name='fecha' className="form-control" onChange={onChangeHonorarioItem} value={honorarioItem?.fecha || ''} />
                                        </div>
                                        <div className="form-group">
                                            <label>Monto</label>
                                            <input type="number" id='monto' name='monto' className="form-control" min="0" onChange={onChangeHonorarioItem} value={honorarioItem?.monto || ''} />
                                        </div>
                                        <div className="form-group">
                                            <label>Observación</label>
                                            <input type="text" id='observacion' name='observacion' className="form-control" onChange={onChangeHonorarioItem} value={honorarioItem?.observacion || ''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="  group-button">
                                    <button type="button" className="m-1 btn btn-secondary" onClick={guardarHonorario}  >Guardar</button>
                                    <button type="button" className="m-1 btn btn-danger" onClick={() => setHonorarioItem(SALARIOINICIAL)} data-dismiss="modal">Cancelar</button>
                                </div>
                            </fieldset>
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Monto</th>
                                        <th>Observacion</th>
                                        <th>Estado</th>
                                        <th  ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        honorarios.map(h =>
                                            <tr key={h.id}>
                                                <td>{new Date(h.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                                <td>{h.monto.toLocaleString('es', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true, currency: 'PYG', style: 'currency', currencyDisplay: 'symbol' })}</td>
                                                <td>{h.observacion}</td>
                                                {(h.activo == 'S' ? <td>ACTIVO</td> : <td>ACTIVO</td>)}
                                                <td>
                                                    <button type="button" ng-click="removeSalario(item)" className="btn btn-danger" title="Eliminar">
                                                        <i className="fa fa-trash-o fa-fw"></i>
                                                    </button>
                                                </td>
                                            </tr>)
                                    }
                                </tbody>
                            </table>


                        </div>

                    </form>
                </ModalData>



            </div>
        </>

    );
};
export default Empleados;

function put(arg0: string) {
    throw new Error('Function not implemented.');
}
function plainToClass(Funcionario: any, responseData: any) {
    throw new Error('Function not implemented.');
}


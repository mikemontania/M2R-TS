import { useContext, useState, useEffect, CSSProperties, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../Context/AuthContext';
import { ContextAuthType } from '../../Interfaces.ts/AuthInterface';
import { get } from '../../Axios/AxiosService';
import sinImagen from '../../Assets/legajo-sin-imagen.jpg';
import { FuncionarioSearch, Sector, Sucursal, Localidad, Estadocivil, Nacionalidad, Pais, CentroCosto, Categoria, Turno, Seleccion, FrecuenciaPago, TipoEmpleado, Barrio, SubSector, OptionSelectComponent, Funcionario, OpcionSelect, Sexo } from '../../Interfaces.ts/FuncionarioSearch';
import Select from 'react-select';
import ModalData from '../../Components/ModalData';

const style: CSSProperties = {
    width: '242px',
    height: '200px',
};

const funcionarioInit: Funcionario = {
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
    honorarioActual: 0,
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
    personasHijos: null,
    salariosDetalle: null,
    empleadoFamilias: null,
    honorariosProfesionales: null,
    sectorInt: null,
    subSectorInt: null,
    frecuenciaId: null,
};

const sexoArray = [{ id: 'M', descripcion: 'MASCULINO' }, { id: 'F', descripcion: 'FEMENINO' }, { id: 'X', descripcion: 'OTROS' }]

const Empleados = () => {
    const { globalData } = useContext<ContextAuthType>(AuthContext);
    //Search funcionario 
    const [funcionariosSearch, setFuncionariosSearch] = useState([]);
    const [selectedFun, setSelectedFun] = useState(null);
    const handleSelectChange = (selectedItem: any) => {
        setSelectedFun(selectedItem);
        getFuncionarioById(+selectedItem.value);
    };
    const [funcionario, setFuncionario] = useState<Funcionario>(funcionarioInit);
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
        setFuncionario(prev => ({
            ...prev,
            [event.target.name]: (event.target.value) ? event.target.value : ''
        }))
    }
    //search Nacionalidad
    const [nacionalidades, setNacionalidades] = useState([]);
    const [selectedNacionalidadId, setSelectedNacionalidadId] = useState<String | null>(null);
    const changeNacionalidad = (selectedItem: any) => {
        setSelectedNacionalidadId(selectedItem);
    };
    //search Pais
    const [paises, setPaises] = useState([]);
    const [selectedPaisId, setSelectedPaisId] = useState<OpcionSelect | null>(null);
    const changePais = (selectedItem: any) => {
        setSelectedPaisId(selectedItem);
    };

    //search Localidad
    const [localidadesData, setLocalidadesData] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidadId, setSelectedLocalidadId] = useState<OpcionSelect | null>(null);
    const changeLocalidad = (selectedItem: any) => {
        setSelectedLocalidadId(selectedItem);
        console.log(selectedItem.value)
        const ciudadActual: Localidad[] = localidadesData.filter((c: Localidad) => c.id == +selectedItem.value)
        if (ciudadActual[0].barrios != null) {
            const barrios = ciudadActual[0].barrios.map(b => ({ label: b.descripcion, value: b.id.toString(), item: b }))
            setBarrios(barrios);
        }
    };
    //search barrios
    const [barrios, setBarrios] = useState<any[]>([]);
    const [selectedBarrioId, setSelectedBarrioId] = useState<OpcionSelect | null>(null);
    const changeBarrio = (selectedItem: any) => {
        setSelectedBarrioId(selectedItem);
    };


    //search sector
    const [sectoresData, setSectoresData] = useState([]);
    const [sectores, setSectores] = useState([]);
    const [selectedSectorId, setSectorId] = useState<OpcionSelect | null>(null);
    const changeSector = (selectedItem: any) => {
        setSectorId(selectedItem);
        console.log(sectoresData);
        const sectorActual: Sector[] = sectoresData.filter((c: Sector) => c.id == +selectedItem.value)
        if (sectorActual[0].subSectors != null) {
            const subSectors = sectorActual[0].subSectors.map(b => ({ label: b.descripcion, value: b.id.toString(), item: b }))
            setSubsectores(subSectors)
        }
    };


    //search subSector
    const [subSectores, setSubsectores] = useState<any[]>([]);
    const [selectedSubSectorId, setSubSectorId] = useState<OpcionSelect | null>(null);
    const changesubSector = (selectedItem: any) => {
        setSubSectorId(selectedItem);
    };



    //search EstadosCiviles
    const [estadosCiviles, setEstadosCiviles] = useState([]);
    const [selectedEstadoCivilId, setSelectedEstadoCivilId] = useState<OpcionSelect | null>(null);
    const changeEstadoCivil = (selectedItem: any) => {
        setSelectedEstadoCivilId(selectedItem);
    };

    //search FrecuenciaPago
    const [frecuenciasPago, setFrecuenciasPago] = useState([]);
    const [selectedFrecuenciaPagoId, setSelectedFrecuenciaPagoId] = useState(null);
    const changeFrecuenciaPago = (selectedItem: any) => {
        setSelectedFrecuenciaPagoId(selectedItem);
    };

    //search TipoEmpleado
    const [tiposEmpleado, setTiposEmpleado] = useState([]);
    const [selectedTipoEmpleadoId, setSelectedTipoEmpleadoId] = useState(null);
    const changeTipoEmpleado = (selectedItem: any) => {
        setSelectedTipoEmpleadoId(selectedItem);
    };

    //search Sexos
    const [sexos, setSexos] = useState<OpcionSelect[] | null>(null);
    const [selectedSexoId, setSelectedSexoId] = useState<OpcionSelect | null>(null);
    const changeSexo = (selectedItem: any) => {
        setSelectedSexoId(selectedItem);
    };

    //search centroCosto
    const [centroscostos, setCentroscostos] = useState([]);
    const [selectedCentroCostoId, setSelectedCentroCostoId] = useState(null);
    const changeCentroCosto = (selectedItem: any) => {
        setSelectedCentroCostoId(selectedItem);
    };


    //search sucursal
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursalId, setSelectedSucursalId] = useState(null);
    const changeSucursal = (selectedItem: any) => {
        setSelectedSucursalId(selectedItem);
    };
    //search categorias
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
    const changeCategoria = (selectedItem: any) => {
        setSelectedCategoriaId(selectedItem);
    };

    //search seleccion
    const [selecciones, setSelecciones] = useState([]);
    const [selectedSeleccionId, setSelectedSeleccionId] = useState(null);
    const changeSeleccion = (selectedItem: any) => {
        setSelectedSeleccionId(selectedItem);
    };
    //search Turno
    const [turnos, setTurnos] = useState([]);
    const [selectedTurnoId, setSelectedTurnoId] = useState(null);
    const changeTurno = (selectedItem: any) => {
        setSelectedTurnoId(selectedItem);
        if (selectedTurnoId != null && selectedSubSectorId != null) {
            getHorarios(selectedTurnoId, selectedSubSectorId)

        }
    };

    //search Horarios
    const [horarios, setHorarios] = useState([]);
    const [selectedHorarioId, setSelectedHorarioId] = useState(null);
    const changeHorario = (selectedItem: any) => {
        setSelectedHorarioId(selectedItem);
    };

    //sino object
    const [siNoList, setSiNoList] = useState([{ value: 'S', label: 'SI' }, { value: 'N', label: 'NO' }]);
    //search controlarHorario
    const [selectedControlHorarioId, setSelectedControlHorarioId] = useState(null);
    const changeControlHorario = (selectedItem: any) => {
        setSelectedControlHorarioId(selectedItem);
    };
    //search activo
    const [selectedActivoId, setSelectedActivoId] = useState(null);
    const changeActivo = (selectedItem: any) => {
        setSelectedActivoId(selectedItem);
    };
    //search FamiliarEmpresa
    const [selectedFamiliarEmpresa, setSelectedFamiliarEmpresa] = useState(null);
    const changeFamiliarEmpresa = (selectedItem: any) => {
        setSelectedFamiliarEmpresa(selectedItem);
    };
    //search bonificacion
    const [selectedBonificacionId, setSelectedBonificacionId] = useState(null);
    const changeBonificacion = (selectedItem: any) => {
        setSelectedBonificacionId(selectedItem);
    };

    //search TipoIps
    const [selectedTipoIps, setSelectedTipoIps] = useState(null);
    const changeTipoIps = (selectedItem: any) => {
        setSelectedTipoIps(selectedItem);
    };
    //search PorcentajeIps
    const [porcentajeIps, setPorcentajeIps] = useState(null);
    const changePorcentajeIps = (selectedItem: any) => {
        setPorcentajeIps(selectedItem);
    };


    const enviarForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes hacer lo que quieras con los datos del formulario
        console.log('Formulario enviado');
    };


    const getFuncionarios = async () => {
        try {
            const response = await get('/private/empleados/porEmpresa/' + globalData?.empresas);
            const selectFun = response.data.map((funcionario: FuncionarioSearch) => ({
                label: funcionario.concat,
                value: funcionario.id.toString(),
            }))
            setFuncionariosSearch(selectFun);
        } catch (error) {
            console.error(error);
        }
    }

    const getFuncionarioById = async (id: number) => {
        try {
            const response = await get('/private/empleados/' + id);
            setFuncionario(response.data as Funcionario);
            console.log(response.data);
            console.log('asignar select');
            if (funcionario?.pais) {
                setSelectedPaisId({
                    value: funcionario?.pais.id.toString(),
                    label: funcionario?.pais.descripcion,
                    item: funcionario?.pais
                });
            }

 
            if (funcionario?.nacionalidad) {
               const element =  {
                    value: funcionario?.nacionalidad.id.toString(),
                    label: funcionario?.nacionalidad.descripcion,
                    item: funcionario?.nacionalidad
                } 
                setSelectedNacionalidadId(element.value);
            }


            if (funcionario?.sexo) {
                setSelectedSexoId({
                    value: funcionario?.sexo.id.toString(),
                    label: funcionario?.sexo.descripcion,
                    item: funcionario?.sexo
                });
            }

            if (funcionario?.estadoCivil) {
                setSelectedEstadoCivilId({
                    value: funcionario?.estadoCivil.id.toString(),
                    label: funcionario?.estadoCivil.descripcion,
                    item: funcionario?.estadoCivil
                });
            }
            if (funcionario?.localidad) {
                setSelectedLocalidadId({
                    value: funcionario?.localidad.id.toString(),
                    label: funcionario?.localidad.descripcion,
                    item: funcionario?.localidad
                });
            }
            if (funcionario?.barrio) {
                setSelectedBarrioId({
                    value: funcionario?.barrio.id.toString(),
                    label: funcionario?.barrio.descripcion,
                    item: funcionario?.barrio
                });
            }


            //setFuncionario(response)
        } catch (error) {
            console.error(error);
        }
    }



    const getHorarios = async (turno: OptionSelectComponent, subSector: OptionSelectComponent) => {
        const turnoId: number = +turno.value;
        const subsectorId: number = +subSector.value;
        try {
            const response = await get('/private/horarios/' + turnoId + '/' + subsectorId);
            console.log(response.data);
            const select = response.data.map((h: any) => ({
                label: h.concat,
                value: h.id.toString(),
                item: h
            }))
            console.log(select);
            setHorarios(select);
        } catch (error) {
            console.error(error);
        }

    }

    const getSexo = async () => {
        const select = sexoArray.map((s: Sexo) => ({ label: s.descripcion, value: s.id.toString(), item: s }))
        if (select) {
            setSexos(select);
        }
    }

    const getPaises = async () => {
        try {
            const response = await get('/private/paises/');
            const selectPaises = response.data.map((p: Pais) => ({
                label: p.descripcion,
                value: p.id.toString(),
                item: p

            }))
            setPaises(selectPaises);
        } catch (error) {
            console.error(error);
        }
    }
    const getSelecciones = async () => {
        try {
            const response = await get('/private/seleccion/');
            const select = response.data.map((p: Seleccion) => ({
                label: p.descripcion,
                value: p.id.toString(),
                item: p
            }))
            setSelecciones(select);
        } catch (error) {
            console.error(error);
        }
    }

    const getNacionalidades = async () => {
        try {
            const response = await get('/private/nacionalidades/');
            const selectNacionalidad = response.data.map((nacionalidad: Nacionalidad) => ({
                label: nacionalidad.descripcion,
                value: nacionalidad.id.toString(),
                item: nacionalidad
            }))
            setNacionalidades(selectNacionalidad);
        } catch (error) {
            console.error(error);
        }
    }

    const getCategorias = async () => {
        try {
            const response = await get('/private/categorias/');
            const select = response.data.map((cat: Categoria) => ({
                label: cat.descripcion,
                value: cat.id.toString(),
                item: cat
            }))
            setCategorias(select);
        } catch (error) {
            console.error(error);
        }
    }


    const getLocalidad = async () => {
        try {
            const response = await get('/private/localidad/');
            setLocalidadesData(response.data);
            const selectLocalidades = response.data.map((localidad: Localidad) => ({
                label: localidad.descripcion,
                value: localidad.id.toString(),
                item: localidad
            }))
            //console.log(selectLocalidades)
            setLocalidades(selectLocalidades);
        } catch (error) {
            console.error(error);
        }
    }

    const getCentroCosto = async () => {
        try {
            const response = await get('/private/centroCosto/');
            const selectCeCo = response.data.map((centroCosto: CentroCosto) => ({
                label: centroCosto.concat,
                value: centroCosto.codigo,
                item: centroCosto
            }))
            setCentroscostos(selectCeCo);
        } catch (error) {
            console.error(error);
        }
    }
    const getSucursales = async () => {
        try {
            const response = await get('/private/sucursales/porEmpresa/' + globalData?.empresas);
            const selectSuc = response.data.map((sucursal: Sucursal) => ({
                label: sucursal.descripcion,
                value: sucursal.id.toString(),
                item: sucursal
            }))
            setSucursales(selectSuc);
        } catch (error) {
            console.error(error);
        }
    }

    const getSectores = async () => {
        try {
            const response = await get('/private/sector/porEmpresa/' + globalData?.empresas);
            setSectoresData(response.data)
            const selectSector = response.data.map((sector: Sector) => ({
                label: sector.descripcion,
                value: sector.id.toString(),
                item: sector
            }))
            setSectores(selectSector);
        } catch (error) {
            console.error(error);
        }
    }


    const getEstadosCiviles = async () => {
        try {
            const response = await get('/private/estadoCivil/');
            const estadoCiviles = response.data.map((estadoCivil: Estadocivil) => ({
                label: estadoCivil.descripcion,
                value: estadoCivil.id.toString(),
                item: estadoCivil
            }))
            setEstadosCiviles(estadoCiviles);
        } catch (error) {
            console.error(error);
        }
    }
    const getFrecuenciaPago = async () => {
        try {
            const response = await get('/private/frecuenciaPago/');
            const f = response.data.map((frecuenciaPago: FrecuenciaPago) => ({
                label: frecuenciaPago.descripcion,
                value: frecuenciaPago.id.toString(),
                item: frecuenciaPago
            }))
            setFrecuenciasPago(f);
        } catch (error) {
            console.error(error);
        }
    }

    const getTiposEmpleado = async () => {
        console.log('getTiposEmpleado')
        try {
            const response = await get('/private/tipoEmpleado/');
            const tipoEmpleado = response.data.map((t: TipoEmpleado) => ({ label: t.descripcion, value: t.id.toString(), }))
            setTiposEmpleado(tipoEmpleado);
        } catch (error) {
            console.error(error);
        }
    }

    const getTurnos = async () => {
        try {
            const response = await get('/private/turnos/listarall/' + globalData?.empresas);
            const select = response.data.map((turno: Turno) => ({
                label: turno.descripcion,
                value: turno.id.toString(),
                item: turno
            }))
            setTurnos(select);
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getFuncionarios();
        getPaises();
        getSexo();
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
    }, []);



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
    /* 
    const guardarSalario = () =>{
        if ($scope.modoSalario == "EDIT") {
            $scope.salariosEdit.fecha = $scope.fechaSalario;
            $scope.salariosEdit.activo = 'S';
    
             $http.put(APP_CONFIG.baseUrl + '/private/salariosDetalle/' + $scope.search.employee.id, $scope.salariosEdit)
              .success(function (data, status, headers, config) {
    
                $http.get(APP_CONFIG.baseUrl + '/private/salariosDetalle/historial/' + $scope.search.employee.id)
                  .success(function (data) {
    
                    $scope.search.employee.salariosDetalle = data;
                    var index = ($scope.search.employee.salariosDetalle.length) - 1;
                    if (index >= 0) {
                      $scope.search.employee.salarioActual = $scope.search.employee.salariosDetalle[index].monto;
                    } else {
                      $scope.search.employee.salarioActual = 0;
                    }
                  })
                  .error(function (response) {
                    console.log('error obtener historial de salarios' + response);
                  });
    
                $('#dialog_salarios').modal('hide');
                $scope.muestraSalarios = false;
                $scope.insertSalarios = false;
                $scope.modoSalario = "INSERT";
              })
              .error(function (response) {
                console.log("error al editar el salario" + response);
              });
          } else {
            var fechaSalario = new Date($scope.salariosAdd.fecha);
            $scope.salariosAdd.activo = 'S';
            fechaSalario.setDate(fechaSalario.getDate());
            if ($scope.modo == "INSERT") {
              var cant = $scope.arraySalarios.length;
              if (cant == 0) {
                $scope.arraySalarios[0] = $scope.salariosAdd;
                $scope.arraySalarios[0].id = null;
                $scope.search.employee.salariosDetalle[0] = $scope.arraySalarios[0];
              } else {
                $scope.arraySalarios[cant] = $scope.salariosAdd;
                $scope.arraySalarios[cant].id = null;
                $scope.search.employee.salariosDetalle[cant] = $scope.arraySalarios[cant];
              }
              $('#dialog_salarios').modal('hide');
              $scope.salariosAdd = {};
              $scope.muestraSalarios = false;
              $scope.insertSalarios = false;
              var index = ($scope.search.employee.salariosDetalle.length) - 1;
              if (index >= 0) {
                $scope.search.employee.salarioActual = $scope.search.employee.salariosDetalle[index].monto;
              } else {
                $scope.search.employee.salarioActual = 0;
              }
            } else {
    
              $http.post(APP_CONFIG.baseUrl + '/private/salariosDetalle/' + $scope.search.employee.id, $scope.salariosAdd)
                .success(function (data, status, headers, config) {
    
                  $http.get(APP_CONFIG.baseUrl + '/private/salariosDetalle/historial/' + $scope.search.employee.id)
                    .success(function (data) {
                      $scope.search.employee.salariosDetalle = data;
                      var index = ($scope.search.employee.salariosDetalle.length) - 1;
                      if (index >= 0) {
                        $scope.search.employee.salarioActual = $scope.search.employee.salariosDetalle[index].monto;
                      } else {
                        $scope.search.employee.salarioActual = 0;
                      }
                      $scope.muestraSalarios = false;
                      $scope.insertSalarios = false;
                    })
                    .error(function (response) {
                      console.log('error obtener historial de salarios' + response);
                    });
    
                  $('#dialog_salarios').modal('hide');
                  $scope.salariosAdd = {};
                })
                .error(function (response) {
                  console.log("error al crear el salario " + response);
                });
            }
          }
    }
    
    
        
          $scope.showSalarios = function (item) {
            if (item) {
              $scope.modoSalario = "EDIT";
              $scope.salariosEdit = item;
              var fecSalario = new Date($scope.salariosEdit.fecha);
              fecSalario.setDate(fecSalario.getDate() + 1);
              //fecSalario.setDate(fecSalario.getDate() + 1);
              $scope.fechaSalario = fecSalario;
            }
            $scope.muestraSalarios = true;
          };
      
          $scope.hideSalarios = function () {
            $scope.muestraSalarios = false;
            $scope.insertSalarios = false;
            $scope.modoSalario = "INSERT";
          };
      
          $scope.modoInsertSalario = function () {
            $scope.insertSalarios = true;
            $scope.modoSalario = "INSERT";
          };
          $scope.removeSalario = function (item) {
            //console.log(item);
            $http.delete(APP_CONFIG.baseUrl + '/private/salariosDetalle/' + item.id)
              .success(function (data) {
                salarioService.query({ id: $scope.search.employee.id }).$promise.then(function (data) {
                  $scope.search.employee.salariosDetalle = data;
                  var index = ($scope.search.employee.salariosDetalle.length) - 1;
                  if (index >= 0) {
                    $scope.search.employee.salarioActual = $scope.search.employee.salariosDetalle[index].monto;
                  } else {
                    $scope.search.employee.salarioActual = 0;
                  }
                  $scope.muestraSalarios = false;
                  $scope.insertSalarios = false;
                });
                // $('#dialog_salarios').modal('hide');
                $scope.salariosAdd = {};
                $scope.salariosEdit = {};
              })
              .error(function (response) {
                console.log('error al eliminar honorario: ' + response);
              });
      
            //  $('#dialog_salarios').modal('hide');
          };
      
    
    
     */





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

                            <Select
                                placeholder='Buscar funcionario'
                                value={selectedFun}
                                onChange={handleSelectChange}
                                options={funcionariosSearch}
                            />
                        </div>

                    </div>
                </div>
            </div>



            <div className='mb-3 card' >
                <div className='card-header-tab card-header'>
                    <div className='card-header-title'>
                        LEGAJO {('' ? ' Nro' + '' : '')}
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
                                                    <label htmlFor='pais' className='form-label'>
                                                        Pais de Nacimiento
                                                    </label>
                                                    <Select placeholder='Seleccione Pais' value={selectedPaisId} onChange={changePais} options={paises} id='pais' name='pais' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='nacionalidad' className='form-label'>
                                                        Nacionalidad:
                                                    </label>
                                                    <Select placeholder='Seleccione Nacionalidad' value={selectedNacionalidadId} onChange={changeNacionalidad} options={nacionalidades} id='nacionalidad' name='nacionalidad' />
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
                                                    <Select placeholder='Seleccione Localidad' value={selectedLocalidadId} onChange={changeLocalidad} options={localidades} id='Localidad' name='Localidad' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='barrio' className='form-label'>
                                                        Barrio:
                                                    </label>
                                                    <Select placeholder='Seleccione Barrio' value={selectedBarrioId} onChange={changeBarrio} options={barrios} id='barrio' name='barrio' />

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
                                                    <Select placeholder='Seleccione Estado civil' value={selectedEstadoCivilId} onChange={changeEstadoCivil} options={estadosCiviles} id='estadoCivil' name='estadoCivil' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='sexo' className='form-label'>
                                                        Sexo
                                                    </label>
                                                    {sexos ? (
                                                        <Select placeholder='Seleccione Sexo' value={selectedSexoId} onChange={changeSexo} options={sexos} id='sexo' name='sexo' />
                                                    ) : (
                                                        <div>Cargando...</div>
                                                    )}                                                </div>
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
                        {/*   <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12' >
                                    <div className=' mt-6 mb-3 card-body d-flex justify-content-center'>
                                        <img src={sinImagen} id='img' alt='Imagen' style={style} />
                                    </div>
                                    <div className=' mt-6 mb-3 card-body d-flex justify-content-center'>
                                        <div className='caption'>
                                            <p>
                                                <input   onChange={ onChange }type='file' className='form-control' id='uploadedfile' file-model='myFile' placeholder=' ' />
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
                                                    <Select placeholder='Seleccione Metodo' value={selectedSeleccionId} onChange={changeSeleccion} options={selecciones} id='seleccion' name='seleccion' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='categoria' className='form-label'>
                                                        Cargo:
                                                    </label>
                                                    <Select placeholder='Seleccione Cargo' value={selectedCategoriaId} onChange={changeCategoria} options={categorias} id='categoria' name='categoria' />
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='centroCosto' className='form-label'>
                                                        Centro costo:
                                                    </label>
                                                    <Select placeholder='Seleccione Centro costo'
                                                        value={selectedCentroCostoId}
                                                        onChange={changeCentroCosto}
                                                        options={centroscostos}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='sucursal' className='form-label'>
                                                        Sucursal
                                                    </label>
                                                    <Select placeholder='Seleccione sucursal' value={selectedSucursalId} onChange={changeSucursal} options={sucursales} id='sucursal' name='sucursal' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='sector' className='form-label'>
                                                        Sector:
                                                    </label>
                                                    <Select placeholder='Seleccione Sector' value={selectedSectorId} onChange={changeSector} options={sectores} id='sector' name='sector' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='subSector' className='form-label'>
                                                        Sub sector:
                                                    </label>
                                                    <Select placeholder='Seleccione sub sector'
                                                        value={selectedSubSectorId}
                                                        onChange={changesubSector}
                                                        options={subSectores}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='controlarHorario' className='form-label'>
                                                        Controlar Horario
                                                    </label>
                                                    <Select placeholder='SI/NO' value={selectedControlHorarioId} onChange={changeControlHorario} options={siNoList} id='controlarHorario' name='controlarHorario' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='turno' className='form-label'>
                                                        Turno:
                                                    </label>
                                                    <Select placeholder='Seleccione turno' value={selectedTurnoId} onChange={changeTurno} options={turnos} id='turno' name='turno' />

                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='horario' className='form-label'>
                                                        Horario:
                                                    </label>
                                                    <Select placeholder='Seleccione horario' value={selectedHorarioId} onChange={changeHorario} options={horarios} id='horario' name='horario' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='form-row'>

                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='fechaIngreso' className='form-label'>
                                                        Fecha Ingreso:
                                                    </label>
                                                    <input
                                                        type='date' className='form-control' id='fechaIngreso' name='fechaIngreso' value={funcionario?.fechaIngreso} required />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='fechaSalida' className='form-label'>
                                                        Fecha Salida:
                                                    </label>
                                                    <input   onChange={ onChange }type='date' className='form-control' id='fechaSalida' name='fechaSalida' value={funcionario?.fechaSalida} />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ctaBanco' className='form-label'>
                                                        Nro cuenta Banco:
                                                    </label>
                                                    <input   onChange={ onChange }type='text' className='form-control' id='ctaBanco' name='ctaBanco' value={funcionario?.ctaBanco} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ingresoIps' className='form-label'>
                                                        Ingreso Ips:
                                                    </label>
                                                    <input   onChange={ onChange }type='date' className='form-control' id='ingresoIps' name='ingresoIps' value={funcionario?.ingresoIps} />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='salidaIps' className='form-label'>
                                                        Ingreso Salida:
                                                    </label>
                                                    <input   onChange={ onChange }type='date' className='form-control' id='salidaIps' name='salidaIps' value={funcionario?.salidaIps} />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='interno' className='form-label'>
                                                        Nro Interno:
                                                    </label>
                                                    <input   onChange={ onChange }type='text' className='form-control' id='interno' name='interno' value={funcionario?.interno} />
                                                </div>
                                            </div>

                                        </div>


                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='activo' className='form-label'>
                                                        Activo:
                                                    </label>
                                                    <Select placeholder='SI/NO' value={selectedActivoId} onChange={changeActivo} options={siNoList} id='activo' name='activo' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='bonificacion' className='form-label'>
                                                        Bonificación:
                                                    </label>
                                                    <Select placeholder='SI/NO' value={selectedBonificacionId} onChange={changeBonificacion} options={siNoList} id='bonificacion' name='bonificacion' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='corporativo' className='form-label'>
                                                        Nro Corporativo:
                                                    </label>
                                                    <input   onChange={ onChange }type='text' className='form-control' id='corporativo' name='corporativo' value={funcionario?.corporativo} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='frecuenciaPago' className='form-label'>
                                                        Frecuencia Pago:
                                                    </label>
                                                    <Select placeholder='Seleccione Frecuencia' value={selectedFrecuenciaPagoId} onChange={changeFrecuenciaPago} options={frecuenciasPago} id='frecuenciaPago' name='frecuenciaPago' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='tipoEmpleado' className='form-label'>
                                                        Tipo Empleado:
                                                    </label>
                                                    <Select placeholder='Seleccione Tipo empleado' value={selectedTipoEmpleadoId} onChange={changeTipoEmpleado} options={tiposEmpleado} id='tipoEmpleado' name='tipoEmpleado' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='tipoIps' className='form-label'>
                                                        Tipo Ips:
                                                    </label>
                                                    <Select placeholder='JORNAL/MENSUAL' value={selectedTipoIps} onChange={changeTipoIps}
                                                        options={[{ value: 'MENSUAL', label: 'MENSUAL' }, { value: 'JORNAL', label: 'JORNAL' }]}
                                                        id='tipoIps' name='tipoIps' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='porcentajeIps' className='form-label'>
                                                        Porcentaje Ips:
                                                    </label>
                                                    <Select placeholder='Seleccione % ips' value={porcentajeIps} onChange={changePorcentajeIps}
                                                        options={[
                                                            { value: '1', label: 'EN BASE AL 9%' },
                                                            { value: '2', label: 'EN BASE AL 25,5%' },
                                                            { value: '3', label: 'NO POSEE IPS' },
                                                        ]}
                                                        id='tipoIps' name='tipoIps' />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='ipsBase' className='form-label'>
                                                        Monto Ips Base:
                                                    </label>
                                                    <input   onChange={ onChange }type='number' className='form-control' id='ipsBase' name='ipsBase' min={0} value={funcionario?.ipsBase} />
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <div className='position-relative form-group'>
                                                    <label htmlFor='anticipo' className='form-label'>
                                                        Monto Anticipo Mensual:
                                                    </label>
                                                    <input   onChange={ onChange }type='number' className='form-control' id='anticipo' name='anticipo' min={0} value={funcionario?.anticipo} />
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
                                                            <input   onChange={ onChange }className="form-control" value={funcionario?.salarioActual}
                                                                type="text" id='salarioActual' name='salarioActual'
                                                                disabled={true} ui-number-mask="0" />

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
                                                            <input   onChange={ onChange }className="form-control" id="honorarioActual" name='honorarioActual' value={funcionario?.honorarioActual}
                                                                type="text"
                                                                disabled={true} ui-number-mask="0" />

                                                        </div>
                                                    </div>




                                                </div>
                                                : null
                                            }
                                        </div>


                                    </form>
                                </div>
                            </div>


                        </div> */}
                    </div>
                    <div className={activeTab === 'tab3' ? 'tab-pane fade show active' : 'tab-pane fade'} >
                        {/*   <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12'>
                                    <div className="position-relative form-group"><label  >Cantidad hijos</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <button type="button" className=" btn btn-secondary"> Modificar datos</button>
                                            </div>
                                            <input   onChange={ onChange }className="form-control"
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
                                            <input   onChange={ onChange }className="form-control"
                                                type="text" id='cantHijos' name='cantHijos'
                                                disabled={true} ui-number-mask="0" />

                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-4 col-sm-12'>
                                    <div className='position-relative form-group'>
                                        <label htmlFor='familiaresEmpresa' className='form-label'>
                                            Familiares en la empresa:
                                        </label>
                                        <Select value={selectedFamiliarEmpresa} onChange={changeFamiliarEmpresa} options={siNoList} id='familiaresEmpresa' name='familiaresEmpresa' />
                                    </div>
                                </div>


                            </div>


                        </div> */}
                    </div>
                    <div className={activeTab === 'tab4' ? 'tab-pane fade show active' : 'tab-pane fade'}     >
                        {/*  <div className='card-body'>
                            <div className="row show-grid">
                                <div className="form-group">
                                    <label className="col-md-2 control-label">Grado académico </label>
                                    <div className="col-md-3">
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.escolarCompleta" />
                                                <span>Educación Escolar Básica (Completa)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.mediaCompleta" />
                                                <span>Educación Media (Completa)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.tecnicaturaCompleta"
                                                    ng-change="habilitarCarrera()" />
                                                <span>Técnicatura (Especificar Área-Completa)</span>
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.universitarioCompleto"
                                                    ng-change="habilitarCarrera()" />
                                                <span>Nivel Universitario(Completo)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.escolarIncompleta" />
                                                <span>Educación Escolar Básica (Incompleta)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.mediaIncompleta" />
                                                <span>Educación Media (Incompleta)</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.tecnicaturaIncompleta"
                                                    ng-change="habilitarCarrera()" />
                                                <span>Técnicatura (Incompleta)</span>
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.universitarioIncompleto"
                                                    ng-change="habilitarCarrera()" />
                                                <span>Nivel Universitario(Incompleto)</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label>Carrera</label>
                                        <div className="input-group">
                                            <select
                                                id="selectCarrera" className="select2"
                                                ng-model="search.employee.carrera"
                                                ng-options="obj.descripcion for obj in carreras track by obj.id"
                                                ng-disabled="selectCarreras">
                                                <option></option>
                                            </select>
                                            <div className="input-group-btn">
                                                <button className="btn btn-default" type="button"
                                                    data-toggle="modal"
                                                    data-target="#dialog_carrera"
                                                    ng-click="carregat()"><i
                                                        className="fa fa-pencil"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label>Especifique si se encuentra cursando actualmente
                                            otros estudios</label>
                                        <textarea rows={4} name="estudios"
                                            ng-model="search.employee.estudios" className="form-control"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2 control-label">Post Graduación </label>
                                    <div className="col-md-3">

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.especializacion"
                                                    ng-change="habilitarPostgrado()" />
                                                <span>Especialización</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.maestria"
                                                    ng-change="habilitarPostgrado()" />
                                                <span>Maestría</span>
                                            </label>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChange} type="checkbox" className="checkbox style-0"
                                                    ng-model="search.employee.doctorado"
                                                    ng-change="habilitarPostgrado()" />
                                                <span>Doctorado</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label>Descripcion del Post Grado</label>
                                        <input onChange={onChange} type="text" name="postgrado"
                                            ng-model="search.employee.postgrado"
                                            className="form-control" ng-disabled="postgrado"
                                        ></input>
                                    </div>
                                </div>
                            </div>


                        </div>
 */}
                    </div>
                </div>
                <button type='submit' className='btn btn-secondary'>
                    Enviar
                </button>
                <button type='submit' className='btn btn-danger'>
                    Cancelar
                </button>

                <ModalData title="Salario" show={showModalSalario} onClose={CloseModalSalario} size="lg">
                    <p>This is an example modal.</p>
                    <p>You can put whatever you want inside it.</p>
                </ModalData>

                <ModalData title="Honorario" show={showModalHonorario} onClose={CloseModalHonorario} size="lg">
                    <p>This is an example modal.</p>
                    <p>You can put whatever you want inside it.</p>
                </ModalData>



            </div>
        </>

    );
};
export default Empleados;
import { useContext, useState, useEffect, CSSProperties } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../Context/AuthContext';
import { ContextAuthType } from '../../Interfaces.ts/AuthInterface';
import { get } from '../../Axios/AxiosService';
import sinImagen from '../../Assets/legajo-sin-imagen.jpg';
import { FuncionarioSearch, Sector, Sucursal, Localidad, Estadocivil, Nacionalidad, Pais } from '../../Interfaces.ts/FuncionarioSearch';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
const style: CSSProperties = {
    width: '242px',
    height: '200px',
};
export interface OpcionSelect {
    label: string,
    value: string,
    options: [],
    style: { backgroundColor: string },
}



const rows = '4';


const Empleados = () => {
    const { globalData } = useContext<ContextAuthType>(AuthContext);
    //Search funcionario 
    const [funcionariosSearch, setFuncionariosSearch] = useState([]);
    const [selectedFun, setSelectedFun] = useState(null);
    const handleSelectChange = (selectedItem: any) => {
        setSelectedFun(selectedItem);
        console.log(selectedFun)
    };
    //Tabs
    const [activeTab, setActiveTab] = useState<string>('tab1');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    //search Nacionalidad
    const [nacionalidades, setNacionalidades] = useState([]);
    const [selectedNacionalidadId, setSelectedNacionalidadId] = useState(null);
    const changeNacionalidad = (selectedItem: any) => {
        setSelectedNacionalidadId(selectedItem);
    };
    //search Pais
    const [paises, setPaises] = useState([]);
    const [selectedPaisId, setSelectedPaisId] = useState(null);
    const changePais = (selectedItem: any) => {
        setSelectedPaisId(selectedItem);
    };

    //search Localidad
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidadId, seSelectedLocalidadId] = useState(null);
    const changeLocalidad = (selectedItem: any) => {
        seSelectedLocalidadId(selectedItem);
    };

    //search barrios
    const [barrios, setBarrios] = useState([]);
    const [selectedBarrioId, seSelectedBarrioId] = useState(null);
    const changeBarrio = (selectedItem: any) => {
        seSelectedBarrioId(selectedItem);
    };

    //search EstadosCiviles
    const [estadosCiviles, setEstadosCiviles] = useState([]);
    const [selectedEstadoCivilId, setSelectedEstadoCivilId] = useState(null);
    const changeEstadoCivil = (selectedItem: any) => {
        setSelectedEstadoCivilId(selectedItem);
    };

    //search Sexos
    const [sexos, setSexos] = useState([{ value: "M", label: "MASCULINO" },
    { value: "F", label: "FEMENINO" },
    { value: "X", label: "OTROS" }
    ]);
    const [selectedSexoId, setSelectedSexoId] = useState(null);
    const changeSexo = (selectedItem: any) => {
        setSelectedSexoId(selectedItem);
    };

    //search sucursal
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursalId, setSelectedSucursalId] = useState(null);
    const changeSucursal = (selectedItem: any) => {
        setSelectedSucursalId(selectedItem);
    };

    //search sector
    const [sectores, setSectores] = useState([]);
    const [selectedSectorId, setSectorId] = useState(null);
    const changeSector = (selectedItem: any) => {
        setSectorId(selectedItem);
    };

    //search subSector
    const [subSectores, setSubsectores] = useState([]);
    const [selectedSubSectorId, setSubSectorId] = useState(null);
    const changesubSector = (selectedItem: any) => {
        setSubSectorId(selectedItem);
    };





    const enviarForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes hacer lo que quieras con los datos del formulario
        console.log('Formulario enviado');
    };


    async function getFuncionarios() {
        console.log('getFuncionarios()')
        try {
            const response = await get('/private/empleados/porEmpresa/' + globalData?.empresas);
            const selectFun = response.data.map((funcionario: FuncionarioSearch) => ({
                label: funcionario.concat,
                value: funcionario.id.toString(),

            }))
            console.log(selectFun)
            setFuncionariosSearch(selectFun);
        } catch (error) {
            console.log(error);
        }
    }

    async function getPaises() {
        try {
            const response = await get('/private/paises/');
            const selectPaises = response.data.map((p: Pais) => ({
                label: p.descripcion,
                value: p.id.toString(),

            }))
            console.log(selectPaises)
            setPaises(selectPaises);
        } catch (error) {
            console.log(error);
        }
    }

    async function getNacionalidades() {
        try {
            const response = await get('/private/nacionalidades/');
            const selectNacionalidad = response.data.map((nacionalidad: Nacionalidad) => ({
                label: nacionalidad.descripcion,
                value: nacionalidad.id.toString(),

            }))
            console.log(selectNacionalidad)
            setNacionalidades(selectNacionalidad);
        } catch (error) {
            console.log(error);
        }
    }

    async function getLocalidad() {
        try {
            const response = await get('/private/localidad/');
            const selectLocalidades = response.data.map((localidad: Localidad) => ({
                label: localidad.descripcion,
                value: localidad.id.toString(),

            }))
            console.log(selectLocalidades)
            setLocalidades(selectLocalidades);
        } catch (error) {
            console.log(error);
        }
    }


    async function getSucursales() {
        try {
            const response = await get('/private/sucursales/porEmpresa/' + globalData?.empresas);
            const selectSuc = response.data.map((sucursal: Sucursal) => ({
                label: sucursal.descripcion,
                value: sucursal.id.toString(),

            }))
            console.log(selectSuc)
            setSucursales(selectSuc);
        } catch (error) {
            console.log(error);
        }
    }

    async function getSectores() {
        try {
            const response = await get('/private/sector/porEmpresa/' + globalData?.empresas);
            const selectSector = response.data.map((sector: Sector) => ({
                label: sector.descripcion,
                value: sector.id.toString(),

            }))
            console.log(selectSector)
            setSectores(selectSector);
        } catch (error) {
            console.log(error);
        }
    }


    async function getEstadosCiviles() {
        try {
            const response = await get('/private/estadoCivil/');
            const estadoCiviles = response.data.map((estadoCivil: Estadocivil) => ({
                label: estadoCivil.descripcion,
                value: estadoCivil.id.toString(),

            }))
            console.log(estadoCiviles)
            setEstadosCiviles(estadoCiviles);
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getFuncionarios();
        getPaises();
        getNacionalidades();
        getEstadosCiviles()
        getLocalidad();
        getSucursales();
        getSectores();
    }, []);




    const tiposIps = [
        { id: "MENSUAL", descripcion: "MENSUAL" },
        { id: "JORNAL", descripcion: "JORNAL" }
    ];
    const empleadoActivo = [{ id: "S", descripcion: "SI" }, { id: "N", descripcion: "NO" }];
    const empleadoBonificacion = [{ id: "S", descripcion: "SI" }, { id: "N", descripcion: "NO" }];
    const siNo = [{ id: "S", descripcion: "SI" }, { id: "N", descripcion: "NO" }];

    return (
        <>

            <div className="mb-3 card">
                <div className="card-header-tab card-header-tab-animation card-header">
                    <div className="card-header-title">
                        Funcionario
                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12'>

                            <Select
                                placeholder="Buscar funcionario"
                                value={selectedFun}
                                onChange={handleSelectChange}
                                options={funcionariosSearch}
                            />
                        </div>

                    </div>
                </div>
            </div>



            <div className='mb-3 card' >
                <div className="card-header-tab card-header">
                    <div className="card-header-title">
                        <i className="header-icon lnr-bicycle icon-gradient bg-love-kiss"> </i>
                        LEGAJO
                    </div>
                    <ul className="nav ">
                        <li className="nav-item">
                            <a
                                className={activeTab === 'tab1' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab1')}                              >
                                Datos Personales
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={activeTab === 'tab2' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab2')}                           >
                                Datos Laborales
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={activeTab === 'tab3' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab3')}
                            >
                                Datos Profesionales
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={activeTab === 'tab4' ? 'nav-link active' : 'nav-link'}
                                onClick={() => handleTabChange('tab4')}
                            >
                                Datos Familiares
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">

                    <div className={activeTab === 'tab1' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12' >
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <img src={sinImagen} id="img" alt="Imagen" style={style} />
                                    </div>
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <div className="caption">
                                            <p>
                                                <input type="file" className="form-control" id="uploadedfile" file-model="myFile" placeholder=" " />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <form onSubmit={enviarForm}>
                                        {/*   linea 1 */}
                                        <div className="form-row">
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nombre" className="form-label">
                                                        Nombres
                                                    </label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="ci" className="form-label">
                                                        C.I.
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ci"
                                                        name="ci"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="fechaNacimiento" className="form-label">
                                                        Fecha Nacimiento:
                                                    </label>
                                                    <input type="date"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="pais" className="form-label">
                                                        Pais de Nacimiento
                                                    </label>
                                                    <Select value={selectedPaisId} onChange={changePais} options={paises} id="pais" name="pais" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nacionalidad" className="form-label">
                                                        Nacionalidad:
                                                    </label>
                                                    <Select value={selectedNacionalidadId} onChange={changeNacionalidad} options={nacionalidades} id="nacionalidad" name="nacionalidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="lugarNacimiento" className="form-label">
                                                        Lugar Nacimiento:
                                                    </label>
                                                    <input type="text"
                                                        id="lugarNacimiento"
                                                        name="lugarNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="Localidad" className="form-label">
                                                        Localidad:
                                                    </label>
                                                    <Select value={selectedLocalidadId} onChange={changeLocalidad} options={localidades} id="Localidad" name="Localidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="barrio" className="form-label">
                                                        Barrio:
                                                    </label>
                                                    <Select value={selectedBarrioId} onChange={changeBarrio} options={barrios} id="barrio" name="barrio" />

                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="direccion" className="form-label">
                                                        Dirección:
                                                    </label>
                                                    <input type="text"
                                                        id="direccion"
                                                        name="direccion"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefono" className="form-label">
                                                        Telefono
                                                    </label>
                                                    <input type="text" className="form-control" id="telefono" name="telefono" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="celular" className="form-label">
                                                        Celular
                                                    </label>
                                                    <input
                                                        type="text" className="form-control" id="celular" name="celular" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefonoFamiliar" className="form-label">
                                                        Telefono Faniliar:
                                                    </label>
                                                    <input type="text" className="form-control" id="telefonoFamiliar" name="telefonoFamiliar" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="estadoCivil" className="form-label">
                                                        EstadoCivil
                                                    </label>
                                                    <Select value={selectedEstadoCivilId} onChange={changeEstadoCivil} options={estadosCiviles} id="estadoCivil" name="estadoCivil" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="sexo" className="form-label">
                                                        Sexo
                                                    </label>
                                                    <Select value={selectedSexoId} onChange={changeSexo} options={sexos} id="sexo" name="sexo" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="email" className="form-label">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="observacion" className="form-label">
                                                        Especifique si aqueja alguna enfermedad
                                                        (Hipertensión, Hipotensión, Diabetes, Alergia,
                                                        etc.)                                                    </label>

                                                    {/* <textarea type="text"  rows={4} name="observacion" class="form-control" capitalize />
                                                    <textarea rows={5} value={texto} onChange={(e) => setTexto(e.target.value)} /> */}
                                                    <textarea rows={5} id="observacion" name="observacion" className="form-control" />
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
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <img src={sinImagen} id="img" alt="Imagen" style={style} />
                                    </div>
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <div className="caption">
                                            <p>
                                                <input type="file" className="form-control" id="uploadedfile" file-model="myFile" placeholder=" " />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <form onSubmit={enviarForm}>
                                        {/*   linea 1 */}
                                        <div className="form-row">
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nombre" className="form-label">
                                                        Nombres
                                                    </label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="ci" className="form-label">
                                                        C.I.
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ci"
                                                        name="ci"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="fechaNacimiento" className="form-label">
                                                        Fecha Nacimiento:
                                                    </label>
                                                    <input type="date"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="pais" className="form-label">
                                                        Pais de Nacimiento
                                                    </label>
                                                    <Select value={selectedPaisId} onChange={changePais} options={paises} id="pais" name="pais" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nacionalidad" className="form-label">
                                                        Nacionalidad:
                                                    </label>
                                                    <Select value={selectedNacionalidadId} onChange={changeNacionalidad} options={nacionalidades} id="nacionalidad" name="nacionalidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="lugarNacimiento" className="form-label">
                                                        Lugar Nacimiento:
                                                    </label>
                                                    <input type="text"
                                                        id="lugarNacimiento"
                                                        name="lugarNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="Localidad" className="form-label">
                                                        Localidad:
                                                    </label>
                                                    <Select value={selectedLocalidadId} onChange={changeLocalidad} options={localidades} id="Localidad" name="Localidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="barrio" className="form-label">
                                                        Barrio:
                                                    </label>
                                                    <Select value={selectedBarrioId} onChange={changeBarrio} options={barrios} id="barrio" name="barrio" />

                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="direccion" className="form-label">
                                                        Dirección:
                                                    </label>
                                                    <input type="text"
                                                        id="direccion"
                                                        name="direccion"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefono" className="form-label">
                                                        Telefono
                                                    </label>
                                                    <input type="text" className="form-control" id="telefono" name="telefono" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="celular" className="form-label">
                                                        Celular
                                                    </label>
                                                    <input
                                                        type="text" className="form-control" id="celular" name="celular" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefonoFamiliar" className="form-label">
                                                        Telefono Faniliar:
                                                    </label>
                                                    <input type="text" className="form-control" id="telefonoFamiliar" name="telefonoFamiliar" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="estadoCivil" className="form-label">
                                                        EstadoCivil
                                                    </label>
                                                    <Select value={selectedEstadoCivilId} onChange={changeEstadoCivil} options={estadosCiviles} id="estadoCivil" name="estadoCivil" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="sexo" className="form-label">
                                                        Sexo
                                                    </label>
                                                    <Select value={selectedSexoId} onChange={changeSexo} options={sexos} id="sexo" name="sexo" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="email" className="form-label">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="observacion" className="form-label">
                                                        Especifique si aqueja alguna enfermedad
                                                        (Hipertensión, Hipotensión, Diabetes, Alergia,
                                                        etc.)                                                    </label>

                                                    {/* <textarea type="text"  rows={4} name="observacion" class="form-control" capitalize />
                                                    <textarea rows={5} value={texto} onChange={(e) => setTexto(e.target.value)} /> */}
                                                    <textarea rows={5} id="observacion" name="observacion" className="form-control" />
                                                </div>
                                            </div>

                                        </div>




                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div  className={activeTab === 'tab3' ? 'tab-pane fade show active' : 'tab-pane fade'} >
                    <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12' >
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <img src={sinImagen} id="img" alt="Imagen" style={style} />
                                    </div>
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <div className="caption">
                                            <p>
                                                <input type="file" className="form-control" id="uploadedfile" file-model="myFile" placeholder=" " />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <form onSubmit={enviarForm}>
                                        {/*   linea 1 */}
                                        <div className="form-row">
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nombre" className="form-label">
                                                        Nombres
                                                    </label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="ci" className="form-label">
                                                        C.I.
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ci"
                                                        name="ci"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="fechaNacimiento" className="form-label">
                                                        Fecha Nacimiento:
                                                    </label>
                                                    <input type="date"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="pais" className="form-label">
                                                        Pais de Nacimiento
                                                    </label>
                                                    <Select value={selectedPaisId} onChange={changePais} options={paises} id="pais" name="pais" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nacionalidad" className="form-label">
                                                        Nacionalidad:
                                                    </label>
                                                    <Select value={selectedNacionalidadId} onChange={changeNacionalidad} options={nacionalidades} id="nacionalidad" name="nacionalidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="lugarNacimiento" className="form-label">
                                                        Lugar Nacimiento:
                                                    </label>
                                                    <input type="text"
                                                        id="lugarNacimiento"
                                                        name="lugarNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="Localidad" className="form-label">
                                                        Localidad:
                                                    </label>
                                                    <Select value={selectedLocalidadId} onChange={changeLocalidad} options={localidades} id="Localidad" name="Localidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="barrio" className="form-label">
                                                        Barrio:
                                                    </label>
                                                    <Select value={selectedBarrioId} onChange={changeBarrio} options={barrios} id="barrio" name="barrio" />

                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="direccion" className="form-label">
                                                        Dirección:
                                                    </label>
                                                    <input type="text"
                                                        id="direccion"
                                                        name="direccion"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefono" className="form-label">
                                                        Telefono
                                                    </label>
                                                    <input type="text" className="form-control" id="telefono" name="telefono" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="celular" className="form-label">
                                                        Celular
                                                    </label>
                                                    <input
                                                        type="text" className="form-control" id="celular" name="celular" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefonoFamiliar" className="form-label">
                                                        Telefono Faniliar:
                                                    </label>
                                                    <input type="text" className="form-control" id="telefonoFamiliar" name="telefonoFamiliar" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="estadoCivil" className="form-label">
                                                        EstadoCivil
                                                    </label>
                                                    <Select value={selectedEstadoCivilId} onChange={changeEstadoCivil} options={estadosCiviles} id="estadoCivil" name="estadoCivil" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="sexo" className="form-label">
                                                        Sexo
                                                    </label>
                                                    <Select value={selectedSexoId} onChange={changeSexo} options={sexos} id="sexo" name="sexo" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="email" className="form-label">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="observacion" className="form-label">
                                                        Especifique si aqueja alguna enfermedad
                                                        (Hipertensión, Hipotensión, Diabetes, Alergia,
                                                        etc.)                                                    </label>

                                                    {/* <textarea type="text"  rows={4} name="observacion" class="form-control" capitalize />
                                                    <textarea rows={5} value={texto} onChange={(e) => setTexto(e.target.value)} /> */}
                                                    <textarea rows={5} id="observacion" name="observacion" className="form-control" />
                                                </div>
                                            </div>

                                        </div>




                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div
                        className={activeTab === 'tab4' ? 'tab-pane fade show active' : 'tab-pane fade'}
                    >
                       <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12' >
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <img src={sinImagen} id="img" alt="Imagen" style={style} />
                                    </div>
                                    <div className=" mt-6 mb-3 card-body d-flex justify-content-center">
                                        <div className="caption">
                                            <p>
                                                <input type="file" className="form-control" id="uploadedfile" file-model="myFile" placeholder=" " />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <form onSubmit={enviarForm}>
                                        {/*   linea 1 */}
                                        <div className="form-row">
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nombre" className="form-label">
                                                        Nombres
                                                    </label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="ci" className="form-label">
                                                        C.I.
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ci"
                                                        name="ci"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="fechaNacimiento" className="form-label">
                                                        Fecha Nacimiento:
                                                    </label>
                                                    <input type="date"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="pais" className="form-label">
                                                        Pais de Nacimiento
                                                    </label>
                                                    <Select value={selectedPaisId} onChange={changePais} options={paises} id="pais" name="pais" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="nacionalidad" className="form-label">
                                                        Nacionalidad:
                                                    </label>
                                                    <Select value={selectedNacionalidadId} onChange={changeNacionalidad} options={nacionalidades} id="nacionalidad" name="nacionalidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="lugarNacimiento" className="form-label">
                                                        Lugar Nacimiento:
                                                    </label>
                                                    <input type="text"
                                                        id="lugarNacimiento"
                                                        name="lugarNacimiento"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="Localidad" className="form-label">
                                                        Localidad:
                                                    </label>
                                                    <Select value={selectedLocalidadId} onChange={changeLocalidad} options={localidades} id="Localidad" name="Localidad" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="barrio" className="form-label">
                                                        Barrio:
                                                    </label>
                                                    <Select value={selectedBarrioId} onChange={changeBarrio} options={barrios} id="barrio" name="barrio" />

                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="direccion" className="form-label">
                                                        Dirección:
                                                    </label>
                                                    <input type="text"
                                                        id="direccion"
                                                        name="direccion"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefono" className="form-label">
                                                        Telefono
                                                    </label>
                                                    <input type="text" className="form-control" id="telefono" name="telefono" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="celular" className="form-label">
                                                        Celular
                                                    </label>
                                                    <input
                                                        type="text" className="form-control" id="celular" name="celular" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="telefonoFamiliar" className="form-label">
                                                        Telefono Faniliar:
                                                    </label>
                                                    <input type="text" className="form-control" id="telefonoFamiliar" name="telefonoFamiliar" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="estadoCivil" className="form-label">
                                                        EstadoCivil
                                                    </label>
                                                    <Select value={selectedEstadoCivilId} onChange={changeEstadoCivil} options={estadosCiviles} id="estadoCivil" name="estadoCivil" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="sexo" className="form-label">
                                                        Sexo
                                                    </label>
                                                    <Select value={selectedSexoId} onChange={changeSexo} options={sexos} id="sexo" name="sexo" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="email" className="form-label">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="col-md-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="observacion" className="form-label">
                                                        Especifique si aqueja alguna enfermedad
                                                        (Hipertensión, Hipotensión, Diabetes, Alergia,
                                                        etc.)                                                    </label>

                                                    {/* <textarea type="text"  rows={4} name="observacion" class="form-control" capitalize />
                                                    <textarea rows={5} value={texto} onChange={(e) => setTexto(e.target.value)} /> */}
                                                    <textarea rows={5} id="observacion" name="observacion" className="form-control" />
                                                </div>
                                            </div>

                                        </div>




                                    </form>
                                </div>
                            </div>


                        </div>
                     
                    </div>
                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                </div>
            </div>



        </>

    );
};

export default Empleados;
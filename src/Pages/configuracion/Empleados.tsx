import { useContext, useState, useEffect, CSSProperties } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../Context/AuthContext';
import { ContextAuthType } from '../../Interfaces.ts/AuthInterface';
import { get } from '../../Axios/AxiosService';
import sinImagen from '../../Assets/legajo-sin-imagen.jpg';
import { FuncionarioSearch } from '../../Interfaces.ts/FuncionarioSearch';
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
const Empleados = () => {
    const { globalData } = useContext<ContextAuthType>(AuthContext);
    const [funcionariosSearch, setFuncionariosSearch] = useState([]);
    const [selectedFun, setSelectedFun] = useState(null);
    const [activeTab, setActiveTab] = useState<string>('tab1');



    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const enviarForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes hacer lo que quieras con los datos del formulario
        console.log('Formulario enviado');
    };

    const handleSelectChange = (selectedItem: any) => {
        setSelectedFun(selectedItem);
        console.log(selectedFun)
    };


    useEffect(() => {
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

        getFuncionarios();
    }, []);

    return (
        <>

            <div className="mb-3 card">
                <div className="card-header-tab card-header-tab-animation card-header">
                    <div className="card-header-title">
                        Funcionario
                    </div>
                </div>
                <div className="card-body">
                    <div>

                        <Select
                            value={selectedFun}
                            onChange={handleSelectChange}
                            options={funcionariosSearch}
                        />

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
                                <div className='col-3'>
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
                                <div className='col-9'>
                                <form onSubmit={enviarForm}>
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
                                                    C.I.
                                                </label>
                                                <input type="date"
                                                    id="fechaNacimiento"
                                                    name="fechaNacimiento"
                                                    className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

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
                                                    C.I.
                                                </label>
                                                <input type="date"
                                                    id="fechaNacimiento"
                                                    name="fechaNacimiento"
                                                    className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

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
                                                    C.I.
                                                </label>
                                                <input type="date"
                                                    id="fechaNacimiento"
                                                    name="fechaNacimiento"
                                                    className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

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
                                                    C.I.
                                                </label>
                                                <input type="date"
                                                    id="fechaNacimiento"
                                                    name="fechaNacimiento"
                                                    className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

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
                                                    C.I.
                                                </label>
                                                <input type="date"
                                                    id="fechaNacimiento"
                                                    name="fechaNacimiento"
                                                    className="form-control" required />
                                            </div>
                                        </div>
                                    </div>




                                </form>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div
                        className={activeTab === 'tab2' ? 'tab-pane fade show active' : 'tab-pane fade'}
                    >
                        <form onSubmit={enviarForm}>

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
                                            C.I.
                                        </label>
                                        <input type="date"
                                            id="fechaNacimiento"
                                            name="fechaNacimiento"
                                            className="form-control" required />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                        </form>
                    </div>
                    <div
                        className={activeTab === 'tab3' ? 'tab-pane fade show active' : 'tab-pane fade'}
                    >
                        <form onSubmit={enviarForm}>
                            <h2>Datos personales</h2>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellido"
                                    name="apellido"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                        </form>
                    </div>
                    <div
                        className={activeTab === 'tab4' ? 'tab-pane fade show active' : 'tab-pane fade'}
                    >
                        <form onSubmit={enviarForm}>
                            <h2>Datos de contacto</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="telefono"
                                    name="telefono"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>



        </>

    );
};

export default Empleados;
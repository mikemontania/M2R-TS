import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import logo from '../assets/react.svg';
import userIcon from '../assets/icons/account.svg';
import passIcon from '../assets/icons/password.svg';
import './Login.css';
import { ContextAuthType } from '../Interfaces.ts/AuthInterface';
import { useNavigate } from 'react-router-dom';
export const LoginPage = () => {
    const { login }: ContextAuthType = useContext(AuthContext);
    const [auth, setAuth] = useState({ username: '', password: '' })
    const navigate = useNavigate();

    const onLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const resp = await login(auth);
            if (resp) {
                navigate('/', {
                    replace: true
                });
            } else {
                console.log('ERROR AL LOGEAR');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container  mt-8r mycontainer">
            <div className="d-flex justify-content-center">
                <div className="col-md-4 col-10">
                    <div className="shadow-sm rounded p-3">
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <form onSubmit={onLogin} autoComplete="off">
                                    <div className="text-center mb-2">
                                        <img
                                            className='imagenlogo'
                                            src={logo}
                                            alt="logo"
                                        />
                                        <h1 className='textoLogo'>
                                            M2R/TS
                                        </h1>
                                    </div>

                                    <div className="mb-2 p-1 d-flex border rounded">
                                        <div className="mx-2 mt-1">
                                            <img
                                                className="img-fluid"
                                                src={userIcon}
                                                alt="iconUser" />
                                        </div>
                                        <input
                                            autoFocus
                                            className="form-control border-0 txt-input"
                                            name="username"
                                            type="email"
                                            placeholder="username"
                                            onChange={e => handleChange(e)}
                                        />
                                    </div>

                                    <div className="mb-2 p-1 d-flex border rounded">
                                        <div className="mx-2 mt-1">
                                            <img
                                                className="img-fluid"
                                                src={passIcon}
                                                alt="iconUser" />
                                        </div>
                                        <input
                                            className="form-control border-0  txt-input"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            onChange={e => handleChange(e)}
                                        />
                                    </div>

                                    <div className="row d-flex justify-content-between mt-3 mb-2">
                                        <div className="mb-3">
                                            <div className="form-check ml-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input  "
                                                    id="mycheckbox"
                                                />
                                                <label className="form-check-label  " htmlFor="mycheckbox">
                                                    Remember
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 text-center ">
                                        <button type="submit" className="btn btn-primary">
                                            INGRESAR
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

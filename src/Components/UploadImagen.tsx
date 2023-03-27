import { useState } from "react";
 import SinImagen from '../../Assets/legajo-sin-imagen.jpg';

interface Props {
  label: string;
}

const UploadImagen = ({ label }: Props)  =>{
  const [imagen, setImagen] = useState<string>("");

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagen(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={handleImagenChange}
      />
      <div className="mt-3">
        {imagen ? (
          <img src={imagen} alt="Imagen cargada" className="img-thumbnail" />
        ) : (
          <img src={SinImagen} alt="Sin imagen" className="img-thumbnail" />
        )}
      </div>
    </div>
  );
}

export default UploadImagen;
/* 

import UploadImagen from "./UploadImagen";

function Formulario() {
  return (
    <form>
      <UploadImagen label="Cargar imagen" />
    Agrega otros campos de formulario aquí  
    </form>
  );
}

export default Formulario; */
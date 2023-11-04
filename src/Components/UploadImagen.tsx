 
 import SinImagen from '../../Assets/legajo-sin-imagen.jpg';

 import React, { useState } from "react";

 interface UploadImageProps {
   path?: string;
 }
 const UploadImage: React.FC<UploadImageProps> = ({ path }) => {
   const [image, setImage] = useState(path || "");
   const [error, setError] = useState("");
 
   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (!file) return;
 
     // Aquí deberías llamar a tu servicio para almacenar la imagen
     try {
     //  const result = await myService.uploadImage(file);
    //   setImage(result.path);
       setError("");
     } catch (e) {
       console.error(e);
       setError("No se pudo cargar la imagen.");
     }
   };
 
   return (
     <>
       {image ? (
         <img src={image} alt="Imagen" />
       ) : (
         <SinImagen />
       )}
       {error && <p>{error}</p>}
       <input type="file" onChange={handleUpload} />
     </>
   );
 };
 
 export default UploadImage;
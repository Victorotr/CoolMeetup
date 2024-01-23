import { useEffect } from "react";

const GeolocationButton = () => {
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    };

    const error = (err) => {
      console.error(`Error getting geolocation: ${err.message}`);
    };

    // Llamar a la geolocalización al montar el componente
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return <div>{/* Contenido del componente */}</div>;
};

export default GeolocationButton;

/* Botón para poner, por ejemplo, al lado del input de buscar un meetup por ciudad o por temática
y al clickar en el pide la geolocalización desde el navegador si el usuario acepta se guardan los datos
en position.coords */

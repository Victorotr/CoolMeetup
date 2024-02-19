import { useNavigate } from "react-router-dom";
const CookiePolicy = () => {
  const navigate = useNavigate();
  return (
    <section className="m-auto py-20  max-w-lg flex flex-col items-left justify-left">
      <p className="text-2xl font-semibold ">Política de cookies</p>
      <p>
        En cumplimiento con lo dispuesto en el artículo 22.2 de la Ley 34/2002,
        de 11 de julio, de Servicios de la Sociedad de la Información y de
        Comercio Electrónico, el Titular le informa que este sitio Web utiliza
        cookies, así como sobre su política de recogida y el tratamiento que
        hace de las mismas.
      </p>
      <div>&nbsp;</div>
      <h4 className="text-xl font-semibold">Qué son las cookies</h4>
      <p>
        Una cookie es un fichero que se descarga en su ordenador al entrar a
        determinadas páginas web. Las cookies permiten a una página web, entre
        otras cosas, almacenar y recuperar información sobre sus hábitos de
        navegación y —dependiendo de la información que contengan y de la forma
        en que utilice su equipo— pueden utilizarse para identificarle.
      </p>
      <div>&nbsp;</div>
      <h4 className="text-xl font-semibold">Tipos de cookies utilizadas</h4>
      <p>
        El sitio Web&nbsp;
        <a href="https://coolmeetups.com">https://coolmeetups.com</a>
        &nbsp;utiliza los siguientes tipos de cookies:
      </p>
      <ul>
        <li>
          <b>Cookies de análisis:</b>&nbsp;Son aquellas que, bien tratadas por
          el sitio Web o por terceros, permiten cuantificar el número de
          usuarios y así realizar la medición y análisis estadístico de la
          utilización que hacen los usuarios del sitio Web. Para ello se analiza
          la navegación que realizas en este sitio Web con el fin de mejorarlo.
        </li>
        <li>
          <b>Cookies técnicas:</b>&nbsp;Son aquellas tratadas por el sitio Web
          que permiten a los usuarios registrados navegar a través del área
          restringida y a utilizar sus diferentes funciones, como por ejemplo,
          llevar a cabo el proceso de compra de un Producto o Servicio.
          <br />
          Algunas cookies son esenciales para el funcionamiento del sitio Web,
          por ejemplo, el sistema de comentarios o el buscador.
        </li>
        <li>
          <b>Cookies de personalización:</b>&nbsp;Son aquellas que permiten a
          los usuarios acceder al Servicio con algunas características de
          carácter general predefinidas en función de una serie de criterios
          establecidos por el usuario como, por ejemplo, el idioma o el tipo de
          navegador a través del cual se conecta a este sitio Web.
        </li>
      </ul>
      <p>
        El siguiente listado recoge el nombre de las cookies que utiliza el
        sitio Web:
      </p>
      <ul>
        <li>cookie1</li>
        <li>cookie2</li>
      </ul>
      <h4>
        <br />
      </h4>
      <h4 className="text-xl font-semibold">Desactivar las cookies</h4>
      <p>
        Usted puede aceptar, bloquear o eliminar las cookies instaladas en su
        equipo mediante la configuración de las opciones del navegador.
        <br />
        <span>
          En los siguientes enlaces encontrará instrucciones para habilitar o
          deshabilitar las cookies en los navegadores más comunes.
        </span>
      </p>
      <ul>
        <li>
          <b>Firefox</b>&nbsp;
          <a
            href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we"
            target="_blank"
            rel="nofollow noopener"
          >
            http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we
          </a>
        </li>
        <li>
          <b>Safari</b>&nbsp;
          <a
            href="http://support.apple.com/kb/HT1677?viewlocale=es_ES"
            target="_blank"
            rel="nofollow noopener"
          >
            http://support.apple.com/kb/HT1677?viewlocale=es_ES
          </a>
        </li>
        <li>
          <b>Google Chrome</b>&nbsp;
          <a
            href="https://support.google.com/chrome/answer/95647?hl=es"
            target="_blank"
            rel="nofollow noopener"
          >
            https://support.google.com/chrome/answer/95647?hl=es
          </a>
        </li>
      </ul>
      <h4>
        <br />
      </h4>
      <h4 className="text-xl font-semibold">Cookies de terceros</h4>
      <p>
        El sitio Web utiliza los servicios de «Google Analytics» que pueden
        instalar cookies que sirven para obtener estadísticas y datos
        publicitarios.
      </p>
      <p>
        El sitio Web incluye otras funcionalidades proporcionadas por las redes
        sociales y que pueden instalar cookies. Usted puede compartir el
        contenido en tus redes sociales como Facebook, Twitter, Google +,
        Instagram o YouTube con los botones incluidos a tal efecto o con las
        herramientas para compartir propias de las redes sociales.
      </p>
      <h4>Advertencia sobre eliminar cookies</h4>
      <p>
        Usted puede eliminar y bloquear las cookies de este sitio Web, pero
        parte del sitio no funcionará correctamente o su calidad puede verse
        afectada.
      </p>
      <div>&nbsp;</div>
      <h4 className="text-xl font-semibold">Contacto</h4>
      <p>
        En caso de que tenga cualquier duda acerca de esta Política de Cookies o
        quiera realizar cualquier comentario sobre este sitio Web, puede enviar
        un mensaje de correo electrónico a la dirección&nbsp;
        <a href="mailto:contacto@coolmeetups.com" target="_blank">
          contacto@coolmeetups.com
        </a>
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="border-2 border-zinc-900/70 mt-5 p-2 rounded-md font-semibold"
      >
        Volver a la Home
      </button>
    </section>
  );
};

export default CookiePolicy;

const SupportCommunityCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Soporte y Comunidad
      </h2>

      {/* Sección de Preguntas Frecuentes */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Preguntas Frecuentes (FAQ)
        </h3>
        <div className="space-y-4">
          <details className="p-4 border border-gray-300 rounded-md">
            <summary className="font-medium cursor-pointer">
              ¿Cómo puedo restablecer mi contraseña?
            </summary>
            <p className="mt-2">
              Para restablecer tu contraseña, ve a la página de inicio de sesión
              y haz clic en {"Olvidé mi contraseña"}. Sigue las instrucciones que
              se te proporcionen para restablecerla.
            </p>
          </details>
          <details className="p-4 border border-gray-300 rounded-md">
            <summary className="font-medium cursor-pointer">
              ¿Cómo puedo contactar al soporte?
            </summary>
            <p className="mt-2 ">
              Puedes contactar al soporte utilizando el formulario en esta
              página o iniciando un chat en vivo desde el botón de {"Soporte en Vivo"}.
            </p>
          </details>
          <details className="p-4 border border-gray-300 rounded-md">
            <summary className="font-medium cursor-pointer">
              ¿Dónde puedo encontrar tutoriales?
            </summary>
            <p className="mt-2 ">
              Nuestros tutoriales están disponibles en la sección de Recursos
              Adicionales. Puedes acceder a guías paso a paso para ayudarte a
              aprovechar al máximo nuestras herramientas.
            </p>
          </details>
        </div>
      </section>

      {/* Foro de la Comunidad */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Foro de la Comunidad</h3>
        <p className="mb-4">
          Únete a la discusión en nuestro foro de la comunidad. Comparte tus
          conocimientos, haz preguntas y ayuda a otros usuarios.
        </p>
        <a href="#" className="text-blue-600 hover:underline">
          Ir al Foro de la Comunidad
        </a>
      </section>

      {/* Soporte en Vivo */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Soporte en Vivo</h3>
        <p className="mb-4">
          ¿Necesitas ayuda inmediata? Haz clic en el botón de abajo para iniciar
          un chat en vivo con uno de nuestros representantes de soporte.
        </p>
        <button className="px-6 py-2 bg-magentaButton text-white font-semibold rounded-md shadow-md focus:outline-none">
          Iniciar Chat en Vivo
        </button>
      </section>

      {/* Formulario de Contacto */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Contactar Soporte</h3>
        <p className="mb-4">
          Si tienes una consulta específica, por favor completa el formulario a
          continuación y te responderemos a la brevedad.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-inherit outline-none"
              placeholder="Escribe tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-inherit outline-none"
              placeholder="Escribe correo electrónico"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mensaje</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-inherit outline-none"
              rows="4"
              placeholder="Escribe tu mensaje aquí"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-magentaButton text-white font-semibold rounded-md shadow-md focus:outline-none"
          >
            Enviar Mensaje
          </button>
        </form>
      </section>

      {/* Recursos Adicionales */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Recursos Adicionales</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Documentación Oficial
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Tutoriales en Video
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Guías de Usuario
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Artículos del Blog
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SupportCommunityCard;

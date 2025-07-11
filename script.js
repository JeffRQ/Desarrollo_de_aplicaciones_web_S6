document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const contrasena = document.getElementById('contrasena');
  const confirmacion = document.getElementById('confirmacion');
  const edad = document.getElementById('edad');
  const enviar = document.getElementById('enviar');

  const errores = {
    nombre: document.getElementById('error-nombre'),
    correo: document.getElementById('error-correo'),
    contrasena: document.getElementById('error-contrasena'),
    confirmacion: document.getElementById('error-confirmacion'),
    edad: document.getElementById('error-edad'),
  };

  function validarNombre() {
    if (nombre.value.trim().length >= 3) {
      setValido(nombre);
      errores.nombre.textContent = '';
      return true;
    } else {
      setInvalido(nombre);
      errores.nombre.textContent = 'Mínimo 3 caracteres';
      return false;
    }
  }

  function validarCorreo() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(correo.value.trim())) {
      setValido(correo);
      errores.correo.textContent = '';
      return true;
    } else {
      setInvalido(correo);
      errores.correo.textContent = 'Correo no válido';
      return false;
    }
  }

  function validarContrasena() {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (regex.test(contrasena.value)) {
      setValido(contrasena);
      errores.contrasena.textContent = '';
      return true;
    } else {
      setInvalido(contrasena);
      errores.contrasena.textContent = 'Debe tener 8 caracteres, un número y un símbolo';
      return false;
    }
  }

  function validarConfirmacion() {
    if (confirmacion.value === contrasena.value && confirmacion.value !== '') {
      setValido(confirmacion);
      errores.confirmacion.textContent = '';
      return true;
    } else {
      setInvalido(confirmacion);
      errores.confirmacion.textContent = 'Las contraseñas no coinciden';
      return false;
    }
  }

  function validarEdad() {
    if (parseInt(edad.value) >= 18) {
      setValido(edad);
      errores.edad.textContent = '';
      return true;
    } else {
      setInvalido(edad);
      errores.edad.textContent = 'Debes tener al menos 18 años';
      return false;
    }
  }

  function setValido(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  }

  function setInvalido(input) {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }

  function validarFormulario() {
    const validaciones = [
      validarNombre(),
      validarCorreo(),
      validarContrasena(),
      validarConfirmacion(),
      validarEdad()
    ];
    enviar.disabled = !validaciones.every(Boolean);
  }

  [nombre, correo, contrasena, confirmacion, edad].forEach(input => {
    input.addEventListener('input', validarFormulario);
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!enviar.disabled) {
      alert('Formulario enviado con éxito');
      formulario.reset();
      [nombre, correo, contrasena, confirmacion, edad].forEach(input => {
        input.classList.remove('valid');
      });
      enviar.disabled = true;
    }
  });
});
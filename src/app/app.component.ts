import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import emailjs from '@emailjs/browser';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio JALL';
  correoEnviado = false; 
  enviando = false;

  emailData = {
    remitente: '',
    correoRemitente: '',
    mensaje: '',
    asunto: "Correo del portfolio personal"
  };

  ngOnInit() {
    window.onscroll = function () {
      const btn = document.getElementById('btnBackToTop') as HTMLElement;
      if (document.documentElement.scrollTop > 200) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    };

    document.getElementById('btnBackToTop')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  esNombreValido(): boolean {
    const nombre = document.getElementById("remitente") as HTMLElement;
    if (this.emailData.remitente.trim() === '') {
      nombre.classList.remove('is-valid');
      nombre.classList.add('is-invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Nombre invalido',
        text: 'El nombre no puede estar vacio. Inserte un nombre',
      });
      return false;
    } else {
      nombre.classList.remove('is-invalid');
      nombre.classList.add('is-valid');
      return true;
    }
  }

  esCorreoValido(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputEmail = document.getElementById("correoRemitente") as HTMLElement;

    if (!emailRegex.test(this.emailData.correoRemitente)) {
      inputEmail.classList.remove('is-valid');
      inputEmail.classList.add('is-invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Email invalido',
        text: 'Por favor, inserte un email valido .',
      });
      return false;
    } else {
      inputEmail.classList.remove('is-invalid');
      inputEmail.classList.add('is-valid');
      return true;
    }
  }

  esMensajeValido(): boolean {
    const textArea = document.getElementById("mensaje") as HTMLElement;
    if (this.emailData.mensaje.trim() === '') {
      textArea.classList.remove('is-valid');
      textArea.classList.add('is-invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Nombre invalido',
        text: 'El mensaje no puede estar vacio. Inserte un mensaje',
      });
      return false;
    } else {
      textArea.classList.remove('is-invalid');
      textArea.classList.add('is-valid');
      return true;
    }
  }

  enviarCorreo() {
    if (!this.esCorreoValido() || !this.esMensajeValido() || !this.esNombreValido()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Por favor, completa correctamente todos los campos.',
      });
      return;
    }

    this.enviando = true; 

    const emailParams = {
      to_email: environment.EMAIL,
      from_name: this.emailData.remitente,
      from_email: this.emailData.correoRemitente,
      subject: this.emailData.asunto,
      message: this.emailData.mensaje
    };

    emailjs.send(environment.SERVICE_ID, environment.TEMPLATE_ID, emailParams, environment.PUBLIC_KEY)
      .then(() => {
        this.enviando = false; 
        this.correoEnviado = true; 
        Swal.fire({
          icon: 'success',
          title: '¡Correo Enviado!',
          text: 'Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.',
        });
      })
      .catch(() => {
        this.enviando = false; 
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el correo. Inténtalo de nuevo más tarde.',
        });
      });
  }
}

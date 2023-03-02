import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  ShowSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  ShowError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error !!',
      text: message,
    });
  }

  ShowLogin() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Haz Ingresado Correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

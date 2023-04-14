import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  ShowSuccess(message:string = "") {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Cambios aplicados",
      showConfirmButton: false,
      timer: 2000,
      text: message || ""
    });
  }

  ShowError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error !!',
      showConfirmButton: false,
      timer: 2000,
      text: message || ""
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

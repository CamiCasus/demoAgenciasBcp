import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MessageSettings } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private router: Router) {}

  toastMessage(parameter: MessageSettings, route: string) {
    swal.fire({
      title: parameter.title,
      icon: parameter.type,
      toast: true,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
    });

    if (route) {
      setTimeout(() => {
        this.router.navigate([route]);
      }, 1000);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public studentList: Array<any> = [];
  constructor(private studentService: StudentService, private router: Router) {
    this.studentService.get().subscribe(respuesta => {
      this.studentList = respuesta;
    });
  }

  comoQuerramos(event){
    this.studentService.get().subscribe(respuesta => {
      this.studentList = respuesta;
      event.target.complete();
    });
  }
  verPerfil(student){
    console.log('Click en estudiante', student);
   this.router.navigate(['perfil',student]);
  }

}

import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './../../services/employee.service';

declare var M:any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employee: Employee[]
  selectedEmployee: Employee;

  constructor(private employeeServices : EmployeeService) {
    this.selectedEmployee = new Employee();
   }

  ngOnInit(): void {
    this.getEmployee();
  }

  resetForm(form?: NgForm){
    if(form.value._id){
      form.reset();
      this.getEmployee();
    }else{
      form.reset();
    }
  }

  addEmployee(form?: NgForm){
    if(form.value._id){
      this.employeeServices.putEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html:'Empleado Actualizado'});
      });
    }else{
      this.employeeServices.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html:'Empleado Guardado'});
        this.getEmployee();
      });
    }
  }

  getEmployee(){
    this.employeeServices.getEmployees()
    .subscribe(res => {
      this.employee = res as Employee[];
      console.log(res)
    });
  }


  editEmployee(employee: Employee){
    this.selectedEmployee = employee;
  };

  deleteEmployee(_id: string, form?: NgForm ){
    if(confirm('Estas seguro de eliminar el registro ?')){
      if(form.value._id){
        form.reset();
        this.employeeServices.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployee();
          M.toast({html:'Empleado Eliminado'});
        });
       }else{
        this.employeeServices.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployee();
          M.toast({html:'Empleado Eliminado'});
        });
       }
    }
  }

}

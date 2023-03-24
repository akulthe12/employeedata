import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  displayedColumns: string[] = ['firstname','lastname','email','dob','gender','education','company','experience','package','action'];
   dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api: ApiService) { }
  ngOnInit():void{
    this.getAllEmpDetails();
  }
  openDialog()
  {
      this.dialog.open(EmployeeListComponent,{
       
          width:'50%',height:'80%'
        }).afterClosed().subscribe(val=>{
          if(val==='dialog')
          this.getAllEmpDetails();
        })
   
    }
     getAllEmpDetails() {
      this.api.getEmployee().subscribe({
        next: (res) => {
         this.dataSource=new MatTableDataSource(res);
         this.dataSource.paginator=this.paginator;
         this.dataSource.sort=this.sort;
         
        },
        error: (err) => {
          alert("Error while fetching the Records.. !!")
        }
      })
    }
    
    editEmployee(row:any)
    {
      this.dialog.open(EmployeeListComponent,{
        width:'30%',
        data:row 
       }).afterClosed().subscribe(val=>
         {
           if(val==='update'){
             this.getAllEmpDetails();
           }
         })
   
    }
    deleteDetails(id:number)
  {
    this.api.deleteDetails(id)
    .subscribe({
      next:(res)=>{
        alert("Details Deleted Sucessfully ");
        this.getAllEmpDetails();
      },
      error:()=>{
        alert("Error while deleting the product")
      }
    })
  }
      
    
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    onDrop(event: CdkDragDrop<any[]>) {
      const prevIndex = this.dataSource.data.findIndex((d) => d === event.item.data);
      moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
      this.dataSource.data = this.dataSource.data.slice();
    }


}

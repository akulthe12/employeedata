import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  constructor(private http:HttpClient) { }

  postEmployee(data:any)
  {
    return this.http.post<any>("http://localhost:3000/empdb",data)
  }
getEmployee(){
return this.http.get<any>("http://localhost:3000/empdb");
}
putDetails(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/empdb"+id,data);

}
deleteDetails(id:number)
{
  return this.http.delete<any>("http://localhost:3000/empdb"+id)
}
}

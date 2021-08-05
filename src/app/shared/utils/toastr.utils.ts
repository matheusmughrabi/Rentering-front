import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ResponseBase } from "../models/responseBase";

@Injectable({
    providedIn: 'root'
})
export class ToastrUtils{
    constructor(private toastr: ToastrService) { }

    public DisplayNotification(data:  ResponseBase<any>){
        if (data.success) {
            this.toastr.success(data.message, 'Notificação');           
          }
          else{
            data.notifications.forEach(c => this.toastr.warning(c.message, c.title));
          }
    }
}
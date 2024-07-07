import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IAlertMessage {
  text: string
  cancelBtn: string
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertSubject = new Subject<IAlertMessage>();

  get alerts$(): Observable<IAlertMessage> {
    return this.alertSubject.asObservable();
  }

  sendAlert(message: IAlertMessage): void {
    this.alertSubject.next(message);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  public school: string;
  public board: string;
  public medium: string;
  public classes: number;
  public rows: Array<{school: string, board: string, medium: string,classes:number}> = [];

  specialEvents = []
  styles: []
  getUser:any= {}

  constructor(private _eventService: EventService,
              private _router: Router,public _authService: AuthService) { }


  ngOnInit() {
    this._eventService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
    )

  }
  buttonClicked() {
    this.rows.push({ school: this.school, board: this.board, medium: this.medium,classes:this.classes });
  }
}

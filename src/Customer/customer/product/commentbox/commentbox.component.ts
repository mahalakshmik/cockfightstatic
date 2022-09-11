import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { clear } from 'console';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.scss']
})
export class CommentboxComponent implements OnInit {

  @Output() add = new EventEmitter<string>();
  value: string='';
  constructor() {}

  ngOnInit() {}

  post() {debugger
    if (this.value.trim()) {
      this.add.emit(this.value);
    }
  }
  clear(){
   this.value='' 
  }
}
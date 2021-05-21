import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages: Message[];
pagination: Pagination;
container: string;
pageNumber: 1;
pageSize: 5;
loading = false;
  constructor(private messageService: MessageService) { 
    //this.container ='Inbox'
    this.container = 'Unread';
    this.pageNumber = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    console.log("messagge component page number: "+this.pageNumber);
    console.log("messagge component page size: "+this.pageSize);
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container)
    .subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id: number){
    this.messageService.deleteMessage(id)
    .subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMessages();
  }

}

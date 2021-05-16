import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/_models/pagination';
import { Member, User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value: 'male', display: 'Males'},{value: 'female', display: 'Females'}]

  constructor(private memberService: MembersService) { 
      this.userParams = this.memberService.getUsersParams();
  }

  ngOnInit(): void {
   // this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers(){

    this.memberService.setUsersParams(this.userParams);
    this.memberService.getMembers(this.userParams)
    .subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      // console.log(
      // "result: " + response.result.length+ 
      // " total items:"+response.pagination.totalItems+
      // " total pages:"+response.pagination.totalPages+
      // " item per page:"+response.pagination.itemsPerPage+
      // " current page:"+response.pagination.currentPage)
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.memberService.setUsersParams(this.userParams);
    this.loadMembers();
  }

}

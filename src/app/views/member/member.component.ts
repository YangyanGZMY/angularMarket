import { Component, OnInit } from '@angular/core';
import {HttpClientUtil} from '../../core/HttpClientUtil';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  constructor(private httpService: HttpClientUtil) {}

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  ngOnInit() {
  }

  private test() {
    const data = this.httpService.get('/api/member/autocomplete');
    console.log(data);
  }
}

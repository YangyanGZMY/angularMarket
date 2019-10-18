import { Component, OnInit } from '@angular/core';
import { HttpClientUtil } from '../../core/HttpClientUtil';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {
  constructor(private httpService: HttpClientUtil) { }

  ngOnInit(): void {
    this.test();
  }

  private test() {
    // const data = this.httpService.get('/api/member/autocomplete');
    // console.log(data);
  }
}

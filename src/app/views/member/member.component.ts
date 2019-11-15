import { Component, OnInit } from '@angular/core';
import { HttpClientUtil } from '../../core/HttpClientUtil';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  constructor(private httpService: HttpClientUtil) {}

  listOfData = [];
  inputValue: string;
  filteredOptions: string[] = [];
  ngOnInit() {
    this.test(18);
    this.getInputValue(this.listOfData);
  }

  private test(phone) {
    const data = this.httpService.get('/api/member/autocomplete?phone=' + phone)
      .subscribe((response: HttpEvent<any>) => {
      console.log(response);
      if ((response as any).msg === 'success') {
        this.listOfData = (response as any).result;
        (response as any).result.forEach(item => {
          this.filteredOptions.push('123');
        });
      }

      }) as any;
    console.log(data);
  }

  onChange(value: string): void {
    // this.test();
    // this.filteredOptions = this.listOfData.filter(option => option.memberPhone.indexOf(value) !== -1 );
    // this.getInputValue(this.filteredOptions);
    // console.log(this.filteredOptions);
  }
  getInputValue(list: any): void {
    this.filteredOptions = list.forEach(item => {
      this.filteredOptions.push(item.value);
    });
  }
}

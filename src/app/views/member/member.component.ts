import { Component, OnInit } from '@angular/core';
import { HttpClientUtil } from '../../core/HttpClientUtil';
import { HttpEvent } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  constructor(private httpService: HttpClientUtil,
              private fb: FormBuilder) {}

  filteredOptions = [];
  listOfData = [];
  inputValue: string;
  isVisible = false;
  validateForm: FormGroup;
  ngOnInit() {
    this.test('');
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    });
  }

  private test(phone) {
    this.httpService.get('/api/member/autocomplete?phone=' + phone)
      .subscribe((response: HttpEvent<any>) => {
      console.log(response);
      if ((response as any).msg === 'success') {
        this.listOfData = (response as any).result;
        this.filteredOptions = [];
        (response as any).result.forEach(item => {
          this.filteredOptions.push(item.value);
        });
      }
      });
  }

  onChange(value: string): void {
    // @ts-ignore
    if (value.indexOf('(') !== -1) {
      // @ts-ignore
      const index = value.lastIndexOf('(');
      value = value.substring(index + 1, value.length - 1);
      this.inputValue = value;
    }
    this.test(value);
  }

  addMember(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    console.log(this.validateForm.controls.name.value);
    const params = {
      name: this.validateForm.controls.name.value,
      phone: this.validateForm.controls.phone.value,
    };
    this.httpService.post('/api/member/add', params)
      .subscribe((response: HttpEvent<any>) => {
        console.log(response);
      });
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}

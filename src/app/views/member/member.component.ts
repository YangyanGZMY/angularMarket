import { Component, OnInit } from '@angular/core';
import { HttpClientUtil } from '../../core/HttpClientUtil';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  constructor(private httpService: HttpClient,
              private fb: FormBuilder) {}

  filteredOptions = [];
  listOfData = [];
  inputValue: string;
  isVisible = false;
  validateForm: FormGroup;
  phoneValidate: string;
  ngOnInit() {
    this.test('');
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required], [this.phoneAsyncValidator]]
    });
  }

  private test(phone) {
    const params = new HttpParams().set('phone', phone);
    this.httpService.get('/api/member/autocomplete', {params})
      .subscribe((response: any) => {
      console.log(response);
      if (response.msg === 'success') {
        this.listOfData = response.result;
        this.filteredOptions = [];
        response.result.forEach(item => {
          this.filteredOptions.push(item.value);
        });
      }
      });
  }

  onChange(value: string): void {
    if (value.indexOf('(') !== -1) {
      const index = value.lastIndexOf('(');
      value = value.substring(index + 1, value.length - 1);
      this.inputValue = value;
    }
    this.test(value);
  }

  addMember(): void {
    this.isVisible = true;
  }

  handleOk(value: any): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm.controls);
    // tslint:disable-next-line:forin
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
    // const params = new HttpParams().set('phone', this.validateForm.controls.phone.value).set('name', this.validateForm.controls.name.value);
    // this.httpService.post('/api/member/add', params )
    //   .subscribe((response: any) => {
    //     if (response.msg === 'success') {
    //       this.ngOnInit();
    //     }
    //   });
    // this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  phoneAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        const mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
        const tel = /^\d{3,4}-?\d{7,9}$/
        if (mobile.test(control.value) || tel.test(control.value)) {
          const params = new HttpParams().set('phone', control.value)
          this.httpService.get('/api/member/checkPhone', {params} )
            .subscribe((response: any) => {
              console.log(response);
              if (response.result) {
                observer.next({ error: false });
                this.phoneValidate = 'success';
                // this.ngOnInit();
              } else {
                observer.next(null);
                this.phoneValidate = 'error';
              }
            });
        } else {
          observer.next(null);
          this.phoneValidate = 'warning';
        }
        observer.complete();
      }, 1000);
    });
}

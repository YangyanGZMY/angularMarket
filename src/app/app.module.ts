import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule} from '@angular/material';
import { NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientUtil } from './core/HttpClientUtil';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { ConvertComponent } from './views/convert/convert.component';
import { MemberComponent } from './views/member/member.component';

// 注册语言包
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ConvertComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NZ_I18N, useValue: zh_CN
    },
    HttpClientUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

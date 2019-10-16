import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule} from '@angular/material';
import { NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { ConvertComponent } from './views/convert/convert.component';
import { MemberComponent } from './views/member/member.component';

// 注册语言包
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
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
    NgZorroAntdModule
  ],
  providers: [
    {
      provide: NZ_I18N, useValue: zh_CN
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

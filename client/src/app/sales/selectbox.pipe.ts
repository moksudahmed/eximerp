import { Component, NgModule, Pipe, PipeTransform } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

@Pipe({
    name: 'selectbox'
})

export class SelectboxPipe implements PipeTransform {
    transform(opt: any, sel?: any): any {
        console.log('sel', sel);
        return (opt || opt === '0') ? opt.filter(sal => { return sal.name == sel }) : opt;
    }
}


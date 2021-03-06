import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    collapsed = false;
    showMenu = '';
    pushRightClass = 'push-right';

    @Output() collapsedEvent = new EventEmitter<boolean>();
    constructor(public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
    
    statusM: boolean = false;
    statusMed(){
        this.statusM = !this.statusM;       
    }
      
    statusP: boolean = false;
    statusPac(){
        this.statusP = !this.statusP;       
    }
      
    statusPed: boolean = false;
    statusPedi(){
        this.statusPed = !this.statusPed;       
    }
    statusF: boolean = false;
    statusFar(){
        this.statusF = !this.statusF;       
    }
}

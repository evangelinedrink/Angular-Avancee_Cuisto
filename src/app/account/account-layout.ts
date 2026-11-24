import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './account-layout.html',
})
export class AccountLayout {}

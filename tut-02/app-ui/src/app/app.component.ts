import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'

type Cat = {
  readonly name: string
  readonly age: number
  readonly breed: string
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  cats: Cat[] = []

  constructor (private http: HttpClient) {
  }

  ngOnInit (): void {
    this.http.get<Cat[]>('http://localhost:3000/cats').pipe(
      tap(cats => this.cats = cats)
    ).subscribe()
  }
}

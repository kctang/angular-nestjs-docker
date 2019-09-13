import {ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {tap} from 'rxjs/operators'
import {environment} from '../environments/environment'

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
    private baseApiUrl: string
    cats: Cat[] = []

    constructor(private http: HttpClient,
                private cd: ChangeDetectorRef) {
        this.baseApiUrl = environment.config.baseApiUrl
    }

    ngOnInit(): void {
        this.http.get<Cat[]>(`${this.baseApiUrl}/cats`).pipe(
            tap(cats => {
                this.cats = cats
                this.cd.markForCheck()
            })
        ).subscribe()
    }
}

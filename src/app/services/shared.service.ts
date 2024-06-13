import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as yaml from 'js-yaml';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private defaultYamlUrl = 'https://raw.githubusercontent.com/valor-labs/valor-jobs/dev/data_compiled/all_positions.yaml';

  private editModeSubject = new BehaviorSubject<boolean>(false);
  private yamlUrlSubject = new BehaviorSubject<string>(this.defaultYamlUrl);
  private yamlContentSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    const savedUrl = this.getLocalStorageItem('yamlUrl');
    if (savedUrl) {
      this.yamlUrlSubject.next(savedUrl);
      this.fetchYamlData(savedUrl).subscribe();
    } else {
      this.fetchYamlData(this.defaultYamlUrl).subscribe();
    }
  }

  get editMode$(): Observable<boolean> {
    return this.editModeSubject.asObservable();
  }

  setEditMode(editMode: boolean): void {
    console.log("Setting edit mode:", editMode); // Add logging here
    this.editModeSubject.next(editMode);
  }

  get yamlUrl$(): Observable<string> {
    return this.yamlUrlSubject.asObservable();
  }

  setYamlUrl(url: string): void {
    this.setLocalStorageItem('yamlUrl', url);
    this.yamlUrlSubject.next(url);
    this.fetchYamlData(url).subscribe();
  }

  get yamlContent$(): Observable<any> {
    return this.yamlContentSubject.asObservable();
  }

  updateJobContent(jobContent: any): void {
    this.yamlContentSubject.next(jobContent);
  }

  private fetchYamlData(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(yamlText => yaml.load(yamlText)),
      tap(data => this.yamlContentSubject.next(data))
    );
  }

  private getLocalStorageItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}

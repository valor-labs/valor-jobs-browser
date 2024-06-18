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
  private defaultJobsYamlUrl = 'https://raw.githubusercontent.com/valor-labs/valor-jobs/dev/data_compiled/all_positions.yaml';
  private defaultQualificationsYamlUrl = 'https://raw.githubusercontent.com/valor-labs/valor-jobs/dev/data_compiled/all_qualifications.yaml';

  private editModeSubject = new BehaviorSubject<boolean>(false);
  private jobsYamlUrlSubject = new BehaviorSubject<string>(this.defaultJobsYamlUrl);
  private qualificationsYamlUrlSubject = new BehaviorSubject<string>(this.defaultQualificationsYamlUrl);
  private jobsContentSubject = new BehaviorSubject<any>(null);
  private qualificationsContentSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    const savedJobsUrl = this.getLocalStorageItem('jobsYamlUrl');
    const savedQualificationsUrl = this.getLocalStorageItem('qualificationsYamlUrl');
    
    if (savedJobsUrl) {
      this.jobsYamlUrlSubject.next(savedJobsUrl);
      this.fetchYamlData(savedJobsUrl).subscribe(data => this.jobsContentSubject.next(data));
    } else {
      this.fetchYamlData(this.defaultJobsYamlUrl).subscribe(data => this.jobsContentSubject.next(data));
    }

    if (savedQualificationsUrl) {
      this.qualificationsYamlUrlSubject.next(savedQualificationsUrl);
      this.fetchYamlData(savedQualificationsUrl).subscribe(data => this.qualificationsContentSubject.next(data));
    } else {
      this.fetchYamlData(this.defaultQualificationsYamlUrl).subscribe(data => this.qualificationsContentSubject.next(data));
    }
  }

  get editMode$(): Observable<boolean> {
    return this.editModeSubject.asObservable();
  }

  setEditMode(editMode: boolean): void {
    this.editModeSubject.next(editMode);
  }

  get jobsYamlUrl$(): Observable<string> {
    return this.jobsYamlUrlSubject.asObservable();
  }

  setJobsYamlUrl(url: string): void {
    this.setLocalStorageItem('jobsYamlUrl', url);
    this.jobsYamlUrlSubject.next(url);
    this.fetchYamlData(url).subscribe(data => this.jobsContentSubject.next(data));
  }

  get qualificationsYamlUrl$(): Observable<string> {
    return this.qualificationsYamlUrlSubject.asObservable();
  }

  setQualificationsYamlUrl(url: string): void {
    this.setLocalStorageItem('qualificationsYamlUrl', url);
    this.qualificationsYamlUrlSubject.next(url);
    this.fetchYamlData(url).subscribe(data => this.qualificationsContentSubject.next(data));
  }

  get jobsContent$(): Observable<any> {
    return this.jobsContentSubject.asObservable();
  }

  get qualificationsContent$(): Observable<any> {
    return this.qualificationsContentSubject.asObservable();
  }

  updateJobsContent(jobsContent: any): void {
    this.jobsContentSubject.next(jobsContent);
  }

  updateQualificationsContent(qualificationsContent: any): void {
    this.qualificationsContentSubject.next(qualificationsContent);
  }

  getCurrentJobsContent(): any {
    return this.jobsContentSubject.value;
  }

  private fetchYamlData(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(yamlText => yaml.load(yamlText))
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

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  private changesIndicatorSubject = new BehaviorSubject<boolean>(false);

  // New subjects to notify about updates
  private jobsUpdatedSubject = new Subject<void>();
  private qualificationsUpdatedSubject = new Subject<void>();

  private jobsOriginalYAMLObj: any;
  private qualificationsOriginalYAMLObj: any;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    const savedJobsUrl = this.getLocalStorageItem('jobsYamlUrl');
    const savedQualificationsUrl = this.getLocalStorageItem('qualificationsYamlUrl');
    
    const resultJobsUrl = savedJobsUrl ?? this.defaultJobsYamlUrl;
    const resultQualificationsUrl = savedQualificationsUrl ?? this.defaultQualificationsYamlUrl;

    this.setJobsYamlUrl(resultJobsUrl);
    this.setQualificationsYamlUrl(resultQualificationsUrl);
    
  }

  getJobsOriginalYAML() {
    return this.jobsOriginalYAMLObj;
  }

  getQualificationsOriginalYAML() {
    return this.qualificationsOriginalYAMLObj;
  }


  get changesIndicator$(): Observable<boolean> {
    return this.changesIndicatorSubject.asObservable();
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
    this.fetchYamlData(url).subscribe(dataObject => {
      this.jobsOriginalYAMLObj = dataObject;
      this.jobsContentSubject.next(dataObject)
    });
  }

  get qualificationsYamlUrl$(): Observable<string> {
    return this.qualificationsYamlUrlSubject.asObservable();
  }

  setQualificationsYamlUrl(url: string): void {
    this.setLocalStorageItem('qualificationsYamlUrl', url);
    this.qualificationsYamlUrlSubject.next(url);
    this.fetchYamlData(url).subscribe(dataObject => {
      this.qualificationsOriginalYAMLObj = dataObject;
      this.qualificationsContentSubject.next(dataObject)
    });
  }

  get jobsContent$(): Observable<any> {
    return this.jobsContentSubject.asObservable();
  }

  get qualificationsContent$(): Observable<any> {
    return this.qualificationsContentSubject.asObservable();
  }


  updateJobsContent(jobsContent: any): void {
    this.changesIndicatorSubject.next(true);

    this.jobsContentSubject.next(jobsContent);
    this.jobsUpdatedSubject.next(); // Notify about the update
  }

  updateQualificationsContent(qualificationsContent: any): void {
    this.changesIndicatorSubject.next(true);

    this.qualificationsContentSubject.next(qualificationsContent);
    this.qualificationsUpdatedSubject.next(); // Notify about the update
  }

  getCurrentJobsContent(): any {
    return this.jobsContentSubject.value;
  }

  getCurrentQualificationsContent(): any {
    return this.qualificationsContentSubject.value;
  }


  /**
   * Fetches the object.
   * 
   * @param url 
   * @returns Observable<any>
   */
  private fetchYamlData(url: string): Observable<any> {
    // Ensure the URL points to the raw content
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    return this.http.get(rawUrl, { responseType: 'text' }).pipe(
      // tap(response => console.log('Fetched response:', response)),
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

  public setChangesIndicator(indicator: boolean):void {
    this.changesIndicatorSubject.next(indicator);
  }
}

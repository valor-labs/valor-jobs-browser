import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as yaml from 'js-yaml';
import { DOCUMENT } from '@angular/common';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public readonly defaultJobsYamlUrl = 'https://raw.githubusercontent.com/valor-labs/valor-jobs/dev/data_compiled/all_positions.yaml';
  public readonly defaultQualificationsYamlUrl = 'https://raw.githubusercontent.com/valor-labs/valor-jobs/dev/data_compiled/all_qualifications.yaml';

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

  getResultJobsUrl() {
    const savedJobsUrl = this.getLocalStorageItem('jobsYamlUrl');
    return (savedJobsUrl && savedJobsUrl!='undefined') ? savedJobsUrl : this.defaultJobsYamlUrl
  }

  getResultQualificationsUrl() {
    const savedQualificationsUrl = this.getLocalStorageItem('qualificationsYamlUrl');
    return savedQualificationsUrl && savedQualificationsUrl!='undefined' ? savedQualificationsUrl :  this.defaultQualificationsYamlUrl;
  }

  constructor(private http: HttpClient, private alertsService: AlertsService) {

    const resultJobsUrl = this.getResultJobsUrl();
    const resultQualificationsUrl = this.getResultQualificationsUrl();
    
    this.jobsYamlUrl$.subscribe(url => {
      if (!url) { url = this.getResultJobsUrl() }

      let sub = this.fetchYamlData(url).subscribe(dataObject => {
        // we need to deep copy the object or else it's the same reference
        this.jobsOriginalYAMLObj = JSON.parse(JSON.stringify(dataObject));
        this.jobsContentSubject.next(dataObject)
        sub.unsubscribe();
      })
    })

    this.qualificationsYamlUrl$.subscribe(url => {
      if (!url) { url = this.getResultQualificationsUrl() }

      let sub = this.fetchYamlData(url).subscribe(dataObject => {
        // we need to deep copy the object or else it's the same reference
        this.qualificationsOriginalYAMLObj = JSON.parse(JSON.stringify(dataObject));
        this.qualificationsContentSubject.next(dataObject)
        sub.unsubscribe();
      })
    })
    

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
  }

  get qualificationsYamlUrl$(): Observable<string> {
    return this.qualificationsYamlUrlSubject.asObservable();
  }

  setQualificationsYamlUrl(url: string): void {
    this.setLocalStorageItem('qualificationsYamlUrl', url);
    this.qualificationsYamlUrlSubject.next(url);
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
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    return this.http.get(rawUrl, { responseType: 'text' }).pipe(
      map(yamlText => yaml.load(yamlText)),
      catchError(error => {
        console.error('Error fetching YAML data:', error);
        this.alertsService.sendAlert({text: "Error fetching YAML data. Check URL in your settings.", cancelBtn: "Ok"})
        return of({ list: []});
      })
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

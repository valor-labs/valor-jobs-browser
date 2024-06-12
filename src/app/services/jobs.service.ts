import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as yaml from 'js-yaml';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private defaultYamlUrl = 'https://raw.githubusercontent.com/valor-labs/valor-jobs/dev/data_compiled/all_positions.yaml';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    const yamlUrl = localStorage.getItem('yamlUrl') || this.defaultYamlUrl;
    return this.http.get(yamlUrl, { responseType: 'text' }).pipe(
      map(yamlText => yaml.load(yamlText))
    );
  }
}

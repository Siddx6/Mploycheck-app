import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Record {
  recordId: string;
  userId: string;
  candidateName: string;
  checkType: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string;
  reportUrl?: string;       // Admin only
  internalNotes?: string;   // Admin only
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecordsResponse {
  records: Record[];
  total: number;
  accessLevel: string;
}

@Injectable({ providedIn: 'root' })
export class RecordService {
  private apiUrl = `${environment.apiUrl}/records`;

  constructor(private http: HttpClient) {}

  getRecords(delayMs?: number): Observable<RecordsResponse> {
    let params = new HttpParams();
    if (delayMs && delayMs > 0) {
      params = params.set('delay', delayMs.toString());
    }
    return this.http.get<RecordsResponse>(this.apiUrl, { params });
  }

  getRecordById(recordId: string): Observable<{ record: Record }> {
    return this.http.get<{ record: Record }>(`${this.apiUrl}/${recordId}`);
  }
}
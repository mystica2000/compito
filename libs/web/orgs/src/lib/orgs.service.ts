import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MultiDocPayload, Organization, UpdateMembersRequest } from '@compito/api-interfaces';
import { API_TOKEN } from '@compito/web/ui';
@Injectable({
  providedIn: 'root',
})
export class OrgService {
  api = `${this.baseURL}/orgs`;
  constructor(private http: HttpClient, @Inject(API_TOKEN) private baseURL: string) {}

  getAll() {
    return this.http.get<MultiDocPayload<Organization>>(this.api);
  }

  getSingle(id: string) {
    return this.http.get<Organization>(`${this.api}/${id}`);
  }

  updateMembers(id: string, data: UpdateMembersRequest) {
    return this.http.patch<Organization>(`${this.api}/${id}/members`, data);
  }
}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorsApiService {

  baseUrl : string  = 'https://detail-doctor.premiumasp.net/api/v1/doctor-detail/'

  constructor(private httpClient : HttpClient) { }

  getDoctorDetailsByCMP(cmp : string = ''){
    return this.httpClient.get(`${this.baseUrl}getalldoctordetailsbycmp?cmp=${cmp}`)
  }

  getDoctorDetailsByName(name : string = ''){
    return this.httpClient.get(`${this.baseUrl}getalldoctordetailsbyname?name=${name}`)
  }

  getDoctorDetailsByNameAndSurname(name : string = '', surname : string = ''){
    return this.httpClient.get(`${this.baseUrl}getalldoctordetailsbynameandsurname?name=${name}&surname=${surname}`)
  }

  getDoctorDetailsBySurname(surname : string = ''){
    return this.httpClient.get(`${this.baseUrl}getalldoctordetailsbysurname?surname=${surname}`)
  }

}

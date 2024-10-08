import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DoctorDetail} from '../../models/doctor-detail';
import {DoctorsApiService} from '../../services/doctors-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {map, Observable, of, startWith, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrl: './doctor-table.component.css'
})
export class DoctorTableComponent extends BaseFormComponent implements OnInit, AfterViewInit, OnDestroy{
  // Attributes

  displayedColumns : string[] = ['molecule', 'descriptionLaboratory', 'department','speciality' ,'cmp', 'ytdSun23', 'ytdSun24', 'qtrDicFeb', 'qtrMarMay', 'qtrJunAgo'];

  dataSource! : MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  // @ViewChild('name',{static : false}) nameInput! : ElementRef;

  @ViewChild('surname', {static: false}) surnameInput! : ElementRef;

  @ViewChild('cmp', {static: false}) cmpInput! : ElementRef;

  detailData : DoctorDetail;

  form! : FormGroup

  submitted = false

  isLoading = false

  // Surname Control
  surnameControl = new FormControl();

  filteredSurnames : Subject<string[]> = new Subject<string[]>()

  surnames : string[] = [];

  // Worker
  private surnameFilterWorker : Worker;


  // Constructor

  constructor(private doctorService : DoctorsApiService, private builder: FormBuilder, private snackBar: MatSnackBar) {
    super();
    this.detailData = {} as DoctorDetail;
    new MatTableDataSource<any>();
    this.doctorService.getAllSurnames().subscribe((data : any) =>{
      this.surnames = data;
    })

    // Initialize the web worker
    this.surnameFilterWorker = new Worker(new URL('../../web-worker/surname-filter.worker', import.meta.url));
    this.surnameFilterWorker.onmessage = ({data}) =>{
      this.filteredSurnames.next(data);
    }
  }

  ngOnInit(){
    this.surnameControl.valueChanges.pipe(
      startWith('')
    ).subscribe(value => this._filterSurname(value));
  }

  private _filterSurname(value : string): void{

    this.surnameFilterWorker.
    postMessage({surnames: this.surnames, filterValue : value.toLowerCase()})
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.surnameFilterWorker.terminate();
  }

  // READ ACTIONS

  onRefresh(){
    // this.nameInput.nativeElement.value = '';
    this.surnameInput.nativeElement.value = '';
    this.cmpInput.nativeElement.value = '';
  }

  onSubmit(){
    // if(this.form.invalid) return;

    let cmp = this.cmpInput.nativeElement.value;

    // let name = this.nameInput.nativeElement.value;

    let surname = this.surnameInput.nativeElement.value;

    if(cmp == '' && surname == '')
    {
      this.snackBar.open('Please fill at least one field.', 'OK',{
        duration: 2000
      });

    }
    else if(cmp != '')
    {
      this.isLoading = true;
      this.doctorService.getDoctorDetailsByCMP(cmp).subscribe((data : any)=>{

        this.dataSource = new MatTableDataSource<any>(data)

        this.dataSource.paginator = this.paginator;

        this.isLoading = false;

        console.log(this.dataSource);
      });
    }
    else
    {
      this.isLoading = true;
      this.doctorService.getDoctorDetailsBySurname(surname).subscribe((data: any)=>{
        this.dataSource = new MatTableDataSource<any>(data)

        this.dataSource.paginator = this.paginator;

        this.isLoading = false;

        console.log(this.dataSource);
      });
    }

    this.submitted = true;
  }


}

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DoctorDetail} from '../../models/doctor-detail';
import {DoctorsApiService} from '../../services/doctors-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {map, Observable, of, startWith} from 'rxjs';

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrl: './doctor-table.component.css'
})
export class DoctorTableComponent extends BaseFormComponent implements OnInit, AfterViewInit{
  // Attributes

  displayedColumns : string[] = ['molecule', 'descriptionLaboratory', 'department','speciality' ,'cmp', 'ytdSun23', 'ytdSun24', 'qtrDicFeb', 'qtrMarMay', 'qtrJunAgo'];

  dataSource! : MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  @ViewChild('name',{static : false}) nameInput! : ElementRef;

  @ViewChild('surname', {static: false}) surnameInput! : ElementRef;

  @ViewChild('cmp', {static: false}) cmpInput! : ElementRef;

  detailData : DoctorDetail;

  form! : FormGroup

  submitted = false

  isLoading = false

  // Surname Control
  surnameControl = new FormControl();

  filteredSurnames : Observable<string[]>;

  surnames : string[] = ["AGUILAR RIVERA", "ALEGRE NIETO", "ALFEREZ CONDORI", "ALVARADO CARRANZA", "ALVARADO QUINTANILLA",
    "ANCHIRAICO HUAROC", "APAZA MAMANI", "ARCAYA SAENZ", "ARESTEGUI SAAVEDRA", "ARGOMEDO RAMOS", "BACA SAENZ", "BORDA OLIVOS",
    "CABEZA NORIEGA", "CACERES PORTUGAL", "CALLA TOVAR", "CAMPOS HERNANDEZ", "CAMPOS MARCAVILLACA", "CANDIA CACERES", "CARRANZA VARAS",
    "CASTRO CASTRO", "CASTRO MAGLUF", "CASTRO VASQUEZ", "CAYANI GUILLEN", "CHAMBERGO ROMERO", "CHUMPEN ELERA", "CONTRERAS TERRONES", "CORREA ROJAS",
    "CORTEZ ESCALANTE", "CRUZADO DIAZ", "CUCHO ESPINOZA", "CUIZANO VARGAS", "CURBELO BOTTO", "CUTIPE CARDENAS", "DE LA CUBA RESTANI",
    "DE LA VEGA RAZURI", "DIAZ FERNANDEZ", "FEIJOO LLONTOP", "FELIPE MORALES RIOS", "FELIX PANDURO", "FERNANDEZ ARANA", "FLORES FERRER",
    "GALINDO TIPACTI", "GERONIMO VIVANCO", "GIRON ORMENO", "GONZALEZ ASMAT", "HERBOZO GONZALEZ", "HUAMANI VILCA", "JIMENEZ HUALLANCA",
    "KAHN PANDURO", "KRUGER MALPARTIDA", "LAZARO MORAN", "LAZO RIVERA", "LUNA LEON", "MACHUCA RAMIREZ", "MALDONADO RUIZ", "MANRIQUE GARCIA",
    "MARREROS PINEDO", "MARTINEZ ALONZO", "MARTORELL COAQUIRA", "MAYORGA ZARATE", "MENA SALDANA", "MENDOZA HUERTA", "MEZA GONZALES",
    "MONTESINOS FARFAN", "MONTOYA BLAS", "MORENO CHACON", "MUNOZ HUERTA", "NUNEZ JOSELI", "OYOLA VALDIZAN", "PACHECO ARMAS", "PARODI JIMENEZ",
    "PEINADO HERRERA", "PURIZAGA PURISACA", "REY SANCHEZ", "REYES LOPEZ", "REYES VALDIVIA", "ROJAS DIAZ", "ROSALES ZAVALA", "SAAVEDRA CASTILLO",
    "SALAZAR ZEGARRA", "SAN MARTIN MEDINA", "SANCHEZ PEREDA", "SINCHE ESPINAL", "SOLANO OYARCE", "TABOADA QUEZADA", "TACO PALMA", "TALAVERA NUNEZ",
    "TRUJILLO HORNA", "UGAZ CAYAO", "VALDERRAMA ESCALANTE", "VALDEZ LAZO", "VALENCIA MERCADO", "VALENZUELA ALBINO", "VANINI GARCIA", "VARGAS MONTOYA",
    "VELARDE TORRES", "VERA SCAMARONE", "VITTERI ORMENO", "YSHIKAWA GUERRERO", "ZEVALLOS RODRIGUEZ"
  ];

  // Name Control

  names : string[] = ["LUIS EMILIO", "CARLOS WILFREDO", "LUIS JOSE", "MARGARITA", "ARMANDO", "PEDRO VIRGILIO", "FANNY", "JAVIER", "JORGE ALBERTO", "EDSON MIGUEL", "MILAGROS ANGELA", "JUAN MANUEL", "ELDER", "ADOLFO ROMEO", "ORLANDO", "JAQUELINE GENOVEVA", "ALCIDES", "JOSE MERCEDES", "EDWIN MARTIN", "LIZARDO", "JAVIER ESTEBAN", "ZOILA ELIZABETH", "ERADIO", "ROGELIO", "JAVIER GONZALO", "LUIS DANIEL", "HEVER CARLO", "FERNANDO DIEGO", "CARLOS MANUEL", "IGNACIO", "LUIS ALFREDO", "JULIAN", "SHERON FROYLANA", "SIMEON IGNACIO", "WILLIAM", "HERNAN ALEXANDER", "CARLOS JESUS", "ROSA MARIA", "ANDRES", "LUIS SILVANO", "CARLOS ALBERTO", "RAY BILLY", "LUIS ALFREDO ALBERTO", "KRIS MAYKOL", "SILVIA LUZ", "CARLOS RAUL", "JOSE CARLOS", "FELIX", "LUIS ENRIQUE", "ALFREDO FEDERICO", "JULIAN NESTOR", "JULIO CESAR", "LIDA RAQUEL", "MARITA MILAGROS", "MARIA DEL PILAR ELLA", "LIZANDRO", "JOHN JAVIER", "JAVIER ALEXANDER", "ALFONSO DANIEL", "LUZ ALEXI", "YURI LICINIO", "NANCY LINETH", "STEPHANIE VANESSA", "CHRISTHIAN", "EDWIN", "ALBERTO GENARO", "OSCAR SERGIO", "HUMBERTO", "GUISELA MARIA", "ANTHONY AQUILES", "JUAN", "MARCY KARIM", "BALTAZAR ELMER", "JORGE ENRIQUE", "LUIS ALBERTO", "GIANFRANCO CESAR ABEL", "JUANA JUDITH", "ANTHONY JUAN", "RAQUEL MARIA", "HERBERT ROLANDO", "SHEDY", "HERNAN BACILIO", "VICTOR MANUEL FULGENCIO", "FERNANDO", "REYNA ZOYLA", "RICARDO DIOGENES", "KAREN SHIRLEE", "LOURDES IRMA", "ALEX BRANDER", "CARLOS ERICK", "ROSEMERY", "CAROL JOANNE", "JORGE LUIS", "LUIS JOSE ELOY", "KARINA PAULA", "DIEGO MARTIN", "MIGUEL ANGEL", "BREISON ALONSO", "FELIX BENJAMIN", "MERLY"
  ];

  filteredNames : Observable<string[]>;

  nameControl = new FormControl();

  // Constructor

  constructor(private doctorService : DoctorsApiService, private builder: FormBuilder) {
    super();
    this.detailData = {} as DoctorDetail;
    new MatTableDataSource<any>();
    this.filteredSurnames = of([]);
    this.filteredNames = of([]);
  }

  ngOnInit(){
    console.log('Hello World!')
    this.form = this.builder.group({
      name: ['', Validators.required],
      cmp: ['', Validators.required],
      surname: ['', Validators.required]
    })

    this.filteredSurnames = this.surnameControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSurname(value))
      )

    this.filteredNames = this.nameControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterName(value))
      )
  }

  private _filterSurname(value : string): string[]{
    const filterValue = value.toLowerCase();

    return this.surnames.filter(surname => surname.toLowerCase().includes(filterValue));
  }

  private _filterName(value : string): string[]{
    const filterValue = value.toLowerCase();

    return this.names.filter(name => name.toLowerCase().includes(filterValue));
  }


  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  // READ ACTIONS

  onRefresh(){
    this.nameInput.nativeElement.value = '';
    this.surnameInput.nativeElement.value = '';
    this.cmpInput.nativeElement.value = '';
  }

  onSubmit(){
    // if(this.form.invalid) return;

    this.isLoading = true;

    let cmp = this.cmpInput.nativeElement.value;

    let name = this.nameInput.nativeElement.value;

    let surname = this.surnameInput.nativeElement.value;

    if(cmp != '')
    {
      this.doctorService.getDoctorDetailsByCMP(cmp).subscribe((data : any)=>{

        this.dataSource = new MatTableDataSource<any>(data)

        this.dataSource.paginator = this.paginator;

        this.isLoading = false;

        console.log(this.dataSource);
      });
    }
    else
    {
      if(name == '' && surname != '')
      {
        this.doctorService.getDoctorDetailsBySurname(surname).subscribe((data: any)=>{
          this.dataSource = new MatTableDataSource<any>(data)

          this.dataSource.paginator = this.paginator;

          this.isLoading = false;

          console.log(this.dataSource);
        });
      }
      else if(name != '' && surname == '')
      {
        this.doctorService.getDoctorDetailsByName(name).subscribe((data : any)=>{
          this.dataSource = new MatTableDataSource<any>(data)

          this.dataSource.paginator = this.paginator;

          this.isLoading = false;

          console.log(this.dataSource)
        })
      }
      else
      {
        this.doctorService.getDoctorDetailsByNameAndSurname(name, surname).subscribe((data : any)=>{
          this.dataSource = new MatTableDataSource<any>(data)

          this.dataSource.paginator = this.paginator;

          this.isLoading = false;

          console.log(this.dataSource)
        });
      }
    }

    this.submitted = true;
  }


}

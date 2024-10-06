export class DoctorDetail {

  id: number;

  descriptionLaboratory : string;

  molecule : string;

  speciality : string;

  cmp : string;

  name : string;

  surname : string;

  department : string;

  ytdSun23 : string;

  ytdSun24 : string;

  qtrSetNov : string;

  qtrDicFeb : string;

  qtrMarMay : string;

  qtrJunAgo : string;


  constructor(id = 0, descriptionLaboratory = '', molecule = '', speciality = '', cmp = '', name = '', surname = '',department = '',
              ytdSun23 = '', ytdSun24 = '', qtrSetNov = '', qtrDicFeb = '', qtrMarMay = '', qtrJunAgo = '') {
    this.id = id;
    this.descriptionLaboratory = descriptionLaboratory;
    this.molecule = molecule;
    this.cmp = cmp;
    this.name = name;
    this.surname = surname;
    this.department = department;
    this.ytdSun23 = ytdSun23;
    this.ytdSun24 = ytdSun24;
    this.qtrSetNov = qtrSetNov;
    this.qtrDicFeb = qtrDicFeb;
    this.qtrMarMay = qtrMarMay;
    this.qtrJunAgo = qtrJunAgo;
    this.speciality = speciality;
  }

}

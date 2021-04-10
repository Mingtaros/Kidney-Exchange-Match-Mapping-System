import { DJANGO_URL } from './Utils/constants';

// get all Dates
function getDate(doc){
  var xmlhttp = new XMLHttpRequest();
  let url = DJANGO_URL + "/getDate"
  xmlhttp.open("GET", url)
}

// get Data from given Date
function getDataDate(date, doc){

}
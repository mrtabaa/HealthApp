import { Injectable } from '@angular/core';
import { ICountry } from '../models/Icountry';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {

  constructor() { }

  // filter the list based on the user's input chars
  public filterCountries(value: string): ICountry[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  countries = [
    { code: '64', acr: 'nz', name: 'New Zealand (+64)', shortName: 'New Zealand' },
    { code: '61', acr: 'au', name: 'Australia (+61)', shortName: 'Australia' },
    { code: '1', acr: 'us', name: 'USA (+1)', shortName: 'USA' },
    { code: '44', acr: 'gb', name: 'UK (+44)', shortName: 'UK' },
    { code: '213', acr: 'dz', name: 'Algeria (+213)', shortName: 'Algeria' },
    { code: '376', acr: 'ad', name: 'Andorra (+376)', shortName: 'Andorra' },
    { code: '244', acr: 'ao', name: 'Angola (+244)', shortName: 'Angola' },
    { code: '1264', acr: 'ai', name: 'Anguilla (+1264)', shortName: 'Anguilla' },
    { code: '1268', acr: 'ag', name: 'Antigua and Barbuda (+1268)', shortName: 'Antigua and Barbuda' },
    { code: '54', acr: 'ar', name: 'Argentina (+54)', shortName: 'Argentina' },
    { code: '374', acr: 'am', name: 'Armenia (+374)', shortName: 'Armenia' },
    { code: '297', acr: 'aw', name: 'Aruba (+297)', shortName: 'Aruba' },
    { code: '43', acr: 'at', name: 'Austria (+43)', shortName: 'Austria' },
    { code: '994', acr: 'az', name: 'Azerbaijan (+994)', shortName: 'Azerbaijan' },
    { code: '1242', acr: 'bs', name: 'Bahamas (+1242)', shortName: 'Bahamas' },
    { code: '973', acr: 'bh', name: 'Bahrain (+973)', shortName: 'Bahrain' },
    { code: '880', acr: 'bd', name: 'Bangladesh (+880)', shortName: 'Bangladesh' },
    { code: '1246', acr: 'bb', name: 'Barbados (+1246)', shortName: 'Barbados' },
    { code: '375', acr: 'by', name: 'Belarus (+375)', shortName: 'Belarus' },
    { code: '32', acr: 'be', name: 'Belgium (+32)', shortName: 'Belgium' },
    { code: '501', acr: 'bz', name: 'Belize (+501)', shortName: 'Belize' },
    { code: '229', acr: 'bj', name: 'Benin (+229)', shortName: 'Benin' },
    { code: '1441', acr: 'bm', name: 'Bermuda (+1441)', shortName: 'Bermuda' },
    { code: '975', acr: 'bt', name: 'Bhutan (+975)', shortName: 'Bhutan' },
    { code: '591', acr: 'bo', name: 'Bolivia (+591)', shortName: 'Bolivia' },
    { code: '387', acr: 'ba', name: 'Bosnia Herzegovina (+387)', shortName: 'Bosnia Herzegovina' },
    { code: '267', acr: 'bw', name: 'Botswana (+267)', shortName: 'Botswana' },
    { code: '55', acr: 'br', name: 'Brazil (+55)', shortName: 'Brazil' },
    { code: '673', acr: 'bn', name: 'Brunei (+673)', shortName: 'Brunei' },
    { code: '359', acr: 'bg', name: 'Bulgaria (+359)', shortName: 'Bulgaria' },
    { code: '226', acr: 'bf', name: 'Burkina Faso (+226)', shortName: 'Burkina Faso' },
    { code: '257', acr: 'bi', name: 'Burundi (+257)', shortName: 'Burundi' },
    { code: '855', acr: 'kh', name: 'Cambodia (+855)', shortName: 'Cambodia' },
    { code: '237', acr: 'cm', name: 'Cameroon (+237)', shortName: 'Cameroon' },
    { code: '1', acr: 'ca', name: 'Canada (+1)', shortName: 'Canada' },
    { code: '238', acr: 'cv', name: 'Cape Verde Islands (+238)', shortName: 'Verde Islands' },
    { code: '1345', acr: 'ky', name: 'Cayman Islands (+1345)', shortName: 'Cayman Islands' },
    { code: '236', acr: 'cf', name: 'Central African Republic (+236)', shortName: 'African Republic' },
    { code: '56', acr: 'cl', name: 'Chile (+56)', shortName: 'Chile' },
    { code: '86', acr: 'cn', name: 'China (+86)', shortName: 'China' },
    { code: '57', acr: 'co', name: 'Colombia (+57)', shortName: 'Colombia' },
    { code: '269', acr: 'km', name: 'Comoros (+269)', shortName: 'Comoros' },
    { code: '242', acr: 'cg', name: 'Congo (+242)', shortName: 'Congo' },
    { code: '682', acr: 'ck', name: 'Cook Islands (+682)', shortName: 'Cook Islands' },
    { code: '506', acr: 'cr', name: 'Costa Rica (+506)', shortName: 'Costa Rica' },
    { code: '385', acr: 'hr', name: 'Croatia (+385)', shortName: 'Croatia' },
    { code: '53', acr: 'cu', name: 'Cuba (+53)', shortName: 'Cuba' },
    { code: '90', acr: 'cy', name: 'Cyprus - North (+90)', shortName: '- North' },
    { code: '357', acr: 'cy', name: 'Cyprus - South (+357)', shortName: '- South' },
    { code: '420', acr: 'cz', name: 'Czech Republic (+420)', shortName: 'Czech Republic' },
    { code: '45', acr: 'dk', name: 'Denmark (+45)', shortName: 'Denmark' },
    { code: '253', acr: 'dj', name: 'Djibouti (+253)', shortName: 'Djibouti' },
    { code: '1809', acr: 'dm', name: 'Dominica (+1809)', shortName: 'Dominica' },
    { code: '1809', acr: 'do', name: 'Dominican Republic (+1809)', shortName: 'Dominican Republic' },
    { code: '593', acr: 'ec', name: 'Ecuador (+593)', shortName: 'Ecuador' },
    { code: '20', acr: 'eg', name: 'Egypt (+20)', shortName: 'Egypt' },
    { code: '503', acr: 'sv', name: 'El Salvador (+503)', shortName: 'El Salvador' },
    { code: '240', acr: 'gq', name: 'Equatorial Guinea (+240)', shortName: 'Equatorial Guinea' },
    { code: '291', acr: 'er', name: 'Eritrea (+291)', shortName: 'Eritrea' },
    { code: '372', acr: 'ee', name: 'Estonia (+372)', shortName: 'Estonia' },
    { code: '251', acr: 'et', name: 'Ethiopia (+251)', shortName: 'Ethiopia' },
    { code: '500', acr: 'fk', name: 'Falkland Islands (+500)', shortName: 'Falkland Islands' },
    { code: '298', acr: 'fo', name: 'Faroe Islands (+298)', shortName: 'Faroe Islands' },
    { code: '679', acr: 'fj', name: 'Fiji (+679)', shortName: 'Fiji' },
    { code: '358', acr: 'fi', name: 'Finland (+358)', shortName: 'Finland' },
    { code: '33', acr: 'fr', name: 'France (+33)', shortName: 'France' },
    { code: '594', acr: 'gf', name: 'French Guiana (+594)', shortName: 'French Guiana' },
    { code: '689', acr: 'pf', name: 'French Polynesia (+689)', shortName: 'French Polynesia' },
    { code: '241', acr: 'ga', name: 'Gabon (+241)', shortName: 'Gabon' },
    { code: '220', acr: 'gm', name: 'Gambia (+220)', shortName: 'Gambia' },
    { code: '7880', acr: 'ge', name: 'Georgia (+7880)', shortName: 'Georgia' },
    { code: '49', acr: 'de', name: 'Germany (+49)', shortName: 'Germany' },
    { code: '233', acr: 'gh', name: 'Ghana (+233)', shortName: 'Ghana' },
    { code: '350', acr: 'gi', name: 'Gibraltar (+350)', shortName: 'Gibraltar' },
    { code: '30', acr: 'gr', name: 'Greece (+30)', shortName: 'Greece' },
    { code: '299', acr: 'gl', name: 'Greenland (+299)', shortName: 'Greenland' },
    { code: '1473', acr: 'gd', name: 'Grenada (+1473)', shortName: 'Grenada' },
    { code: '590', acr: 'gp', name: 'Guadeloupe (+590)', shortName: 'Guadeloupe' },
    { code: '671', acr: 'gu', name: 'Guam (+671)', shortName: 'Guam' },
    { code: '502', acr: 'gt', name: 'Guatemala (+502)', shortName: 'Guatemala' },
    { code: '224', acr: 'gn', name: 'Guinea (+224)', shortName: 'Guinea' },
    { code: '245', acr: 'gw', name: 'Guinea - Bissau (+245)', shortName: '- Bissau' },
    { code: '592', acr: 'gy', name: 'Guyana (+592)', shortName: 'Guyana' },
    { code: '509', acr: 'ht', name: 'Haiti (+509)', shortName: 'Haiti' },
    { code: '504', acr: 'hn', name: 'Honduras (+504)', shortName: 'Honduras' },
    { code: '852', acr: 'hk', name: 'Hong Kong (+852)', shortName: 'Hong Kong' },
    { code: '36', acr: 'hu', name: 'Hungary (+36)', shortName: 'Hungary' },
    { code: '354', acr: 'is', name: 'Iceland (+354)', shortName: 'Iceland' },
    { code: '91', acr: 'in', name: 'India (+91)', shortName: 'India' },
    { code: '62', acr: 'id', name: 'Indonesia (+62)', shortName: 'Indonesia' },
    { code: '964', acr: 'iq', name: 'Iraq (+964)', shortName: 'Iraq' },
    { code: '98', acr: 'ir', name: 'Iran (+98)', shortName: 'Iran' },
    { code: '353', acr: 'ie', name: 'Ireland (+353)', shortName: 'Ireland' },
    { code: '972', acr: 'il', name: 'Israel (+972)', shortName: 'Israel' },
    { code: '39', acr: 'it', name: 'Italy (+39)', shortName: 'Italy' },
    { code: '1876', acr: 'jm', name: 'Jamaica (+1876)', shortName: 'Jamaica' },
    { code: '81', acr: 'jp', name: 'Japan (+81)', shortName: 'Japan' },
    { code: '962', acr: 'jo', name: 'Jordan (+962)', shortName: 'Jordan' },
    { code: '7', acr: 'kz', name: 'Kazakhstan (+7)', shortName: 'Kazakhstan' },
    { code: '254', acr: 'ke', name: 'Kenya (+254)', shortName: 'Kenya' },
    { code: '686', acr: 'ki', name: 'Kiribati (+686)', shortName: 'Kiribati' },
    { code: '850', acr: 'kp', name: 'Korea - North (+850)', shortName: '- North' },
    { code: '82', acr: 'kr', name: 'Korea - South (+82)', shortName: '- South' },
    { code: '965', acr: 'kw', name: 'Kuwait (+965)', shortName: 'Kuwait' },
    { code: '996', acr: 'kg', name: 'Kyrgyzstan (+996)', shortName: 'Kyrgyzstan' },
    { code: '856', acr: 'la', name: 'Laos (+856)', shortName: 'Laos' },
    { code: '371', acr: 'lv', name: 'Latvia (+371)', shortName: 'Latvia' },
    { code: '961', acr: 'lb', name: 'Lebanon (+961)', shortName: 'Lebanon' },
    { code: '266', acr: 'ls', name: 'Lesotho (+266)', shortName: 'Lesotho' },
    { code: '231', acr: 'lr', name: 'Liberia (+231)', shortName: 'Liberia' },
    { code: '218', acr: 'ly', name: 'Libya (+218)', shortName: 'Libya' },
    { code: '417', acr: 'li', name: 'Liechtenstein (+417)', shortName: 'Liechtenstein' },
    { code: '370', acr: 'lt', name: 'Lithuania (+370)', shortName: 'Lithuania' },
    { code: '352', acr: 'lu', name: 'Luxembourg (+352)', shortName: 'Luxembourg' },
    { code: '853', acr: 'mo', name: 'Macao (+853)', shortName: 'Macao' },
    { code: '389', acr: 'mk', name: 'Macedonia (+389)', shortName: 'Macedonia' },
    { code: '261', acr: 'mg', name: 'Madagascar (+261)', shortName: 'Madagascar' },
    { code: '265', acr: 'mw', name: 'Malawi (+265)', shortName: 'Malawi' },
    { code: '60', acr: 'my', name: 'Malaysia (+60)', shortName: 'Malaysia' },
    { code: '960', acr: 'mv', name: 'Maldives (+960)', shortName: 'Maldives' },
    { code: '223', acr: 'ml', name: 'Mali (+223)', shortName: 'Mali' },
    { code: '356', acr: 'mt', name: 'Malta (+356)', shortName: 'Malta' },
    { code: '692', acr: 'mh', name: 'Marshall Islands (+692)', shortName: 'Marshall Islands' },
    { code: '596', acr: 'mq', name: 'Martinique (+596)', shortName: 'Martinique' },
    { code: '222', acr: 'mr', name: 'Mauritania (+222)', shortName: 'Mauritania' },
    { code: '269', acr: 'yt', name: 'Mayotte (+269)', shortName: 'Mayotte' },
    { code: '52', acr: 'mx', name: 'Mexico (+52)', shortName: 'Mexico' },
    { code: '691', acr: 'fm', name: 'Micronesia (+691)', shortName: 'Micronesia' },
    { code: '373', acr: 'md', name: 'Moldova (+373)', shortName: 'Moldova' },
    { code: '377', acr: 'mc', name: 'Monaco (+377)', shortName: 'Monaco' },
    { code: '976', acr: 'mn', name: 'Mongolia (+976)', shortName: 'Mongolia' },
    { code: '382', acr: 'me', name: 'Montenegro (+382)', shortName: 'Montenegro' },
    { code: '1664', acr: 'ms', name: 'Montserrat (+1664)', shortName: 'Montserrat' },
    { code: '212', acr: 'ma', name: 'Morocco (+212)', shortName: 'Morocco' },
    { code: '258', acr: 'mz', name: 'Mozambique (+258)', shortName: 'Mozambique' },
    { code: '95', acr: 'mn', name: 'Myanmar (+95)', shortName: 'Myanmar' },
    { code: '264', acr: 'na', name: 'Namibia (+264)', shortName: 'Namibia' },
    { code: '674', acr: 'nr', name: 'Nauru (+674)', shortName: 'Nauru' },
    { code: '977', acr: 'np', name: 'Nepal (+977)', shortName: 'Nepal' },
    { code: '31', acr: 'nl', name: 'Netherlands (+31)', shortName: 'Netherlands' },
    { code: '687', acr: 'nc', name: 'New Caledonia (+687)', shortName: 'New Caledonia' },
    { code: '505', acr: 'ni', name: 'Nicaragua (+505)', shortName: 'Nicaragua' },
    { code: '227', acr: 'ne', name: 'Niger (+227)', shortName: 'Niger' },
    { code: '234', acr: 'ng', name: 'Nigeria (+234)', shortName: 'Nigeria' },
    { code: '683', acr: 'nu', name: 'Niue (+683)', shortName: 'Niue' },
    { code: '672', acr: 'nf', name: 'Norfolk Islands (+672)', shortName: 'Norfolk Islands' },
    { code: '670', acr: 'np', name: 'Northern Marianas (+670)', shortName: 'Northern Marianas' },
    { code: '47', acr: 'no', name: 'Norway (+47)', shortName: 'Norway' },
    { code: '968', acr: 'om', name: 'Oman (+968)', shortName: 'Oman' },
    { code: '92', acr: 'pk', name: 'Pakistan (+92)', shortName: 'Pakistan' },
    { code: '680', acr: 'pw', name: 'Palau (+680)', shortName: 'Palau' },
    { code: '507', acr: 'pa', name: 'Panama (+507)', shortName: 'Panama' },
    { code: '675', acr: 'pg', name: 'Papua New Guinea (+675)', shortName: 'New Guinea' },
    { code: '595', acr: 'py', name: 'Paraguay (+595)', shortName: 'Paraguay' },
    { code: '51', acr: 'pe', name: 'Peru (+51)', shortName: 'Peru' },
    { code: '63', acr: 'ph', name: 'Philippines (+63)', shortName: 'Philippines' },
    { code: '48', acr: 'pl', name: 'Poland (+48)', shortName: 'Poland' },
    { code: '351', acr: 'pt', name: 'Portugal (+351)', shortName: 'Portugal' },
    { code: '1787', acr: 'pr', name: 'Puerto Rico (+1787)', shortName: 'Puerto Rico' },
    { code: '974', acr: 'qa', name: 'Qatar (+974)', shortName: 'Qatar' },
    { code: '262', acr: 're', name: 'Reunion (+262)', shortName: 'Reunion' },
    { code: '40', acr: 'ro', name: 'Romania (+40)', shortName: 'Romania' },
    { code: '7', acr: 'ru', name: 'Russia (+7)', shortName: 'Russia' },
    { code: '250', acr: 'rw', name: 'Rwanda (+250)', shortName: 'Rwanda' },
    { code: '378', acr: 'sm', name: 'San Marino (+378)', shortName: 'San Marino' },
    { code: '239', acr: 'st', name: 'Sao Tome and Principe (+239)', shortName: 'Sao Tome and Principe' },
    { code: '966', acr: 'sa', name: 'Saudi Arabia (+966)', shortName: 'Saudi Arabia' },
    { code: '221', acr: 'sn', name: 'Senegal (+221)', shortName: 'Senegal' },
    { code: '381', acr: 'rs', name: 'Serbia (+381)', shortName: 'Serbia' },
    { code: '248', acr: 'sc', name: 'Seychelles (+248)', shortName: 'Seychelles' },
    { code: '232', acr: 'sl', name: 'Sierra Leone (+232)', shortName: 'Sierra Leone' },
    { code: '65', acr: 'sg', name: 'Singapore (+65)', shortName: 'Singapore' },
    { code: '421', acr: 'sk', name: 'Slovak Republic (+421)', shortName: 'Slovak Republic' },
    { code: '386', acr: 'si', name: 'Slovenia (+386)', shortName: 'Slovenia' },
    { code: '677', acr: 'sb', name: 'Solomon Islands (+677)', shortName: 'Solomon Islands' },
    { code: '252', acr: 'so', name: 'Somalia (+252)', shortName: 'Somalia' },
    { code: '27', acr: 'za', name: 'South Africa (+27)', shortName: 'South Africa' },
    { code: '34', acr: 'es', name: 'Spain (+34)', shortName: 'Spain' },
    { code: '94', acr: 'lk', name: 'Sri Lanka (+94)', shortName: 'Sri Lanka' },
    { code: '290', acr: 'sh', name: 'St. Helena (+290)', shortName: 'St. Helena' },
    { code: '1869', acr: 'kn', name: 'St. Kitts (+1869)', shortName: 'St. Kitts' },
    { code: '1758', acr: 'sc', name: 'St. Lucia (+1758)', shortName: 'St. Lucia' },
    { code: '597', acr: 'sr', name: 'Suriname (+597)', shortName: 'Suriname' },
    { code: '249', acr: 'sd', name: 'Sudan (+249)', shortName: 'Sudan' },
    { code: '268', acr: 'sz', name: 'Swaziland (+268)', shortName: 'Swaziland' },
    { code: '46', acr: 'se', name: 'Sweden (+46)', shortName: 'Sweden' },
    { code: '41', acr: 'ch', name: 'Switzerland (+41)', shortName: 'Switzerland' },
    { code: '963', acr: 'sy', name: 'Syria (+963)', shortName: 'Syria' },
    { code: '886', acr: 'tw', name: 'Taiwan (+886)', shortName: 'Taiwan' },
    { code: '992', acr: 'tj', name: 'Tajikistan (+992)', shortName: 'Tajikistan' },
    { code: '66', acr: 'th', name: 'Thailand (+66)', shortName: 'Thailand' },
    { code: '228', acr: 'tg', name: 'Togo (+228)', shortName: 'Togo' },
    { code: '676', acr: 'to', name: 'Tonga (+676)', shortName: 'Tonga' },
    { code: '1868', acr: 'tt', name: 'Trinidad and Tobago (+1868)', shortName: 'Trinidad and Tobago' },
    { code: '216', acr: 'tn', name: 'Tunisia (+216)', shortName: 'Tunisia' },
    { code: '90', acr: 'tr', name: 'Turkey (+90)', shortName: 'Turkey' },
    { code: '993', acr: 'tm', name: 'Turkmenistan (+993)', shortName: 'Turkmenistan' },
    { code: '1649', acr: 'tc', name: 'Turks and Caicos Islands (+1649)', shortName: 'Turks and Caicos Islands' },
    { code: '688', acr: 'tv', name: 'Tuvalu (+688)', shortName: 'Tuvalu' },
    { code: '256', acr: 'ug', name: 'Uganda (+256)', shortName: 'Uganda' },
    { code: '380', acr: 'ua', name: 'Ukraine (+380)', shortName: 'Ukraine' },
    { code: '971', acr: 'ae', name: 'United Arab Emirates (+971)', shortName: 'Arab Emirates' },
    { code: '598', acr: 'uy', name: 'Uruguay (+598)', shortName: 'Uruguay' },
    { code: '998', acr: 'uz', name: 'Uzbekistan (+998)', shortName: 'Uzbekistan' },
    { code: '678', acr: 'vu', name: 'Vanuatu (+678)', shortName: 'Vanuatu' },
    { code: '379', acr: 'va', name: 'Vatican City (+379)', shortName: 'Vatican City' },
    { code: '58', acr: 've', name: 'Venezuela (+58)', shortName: 'Venezuela' },
    { code: '84', acr: 'vn', name: 'Vietnam (+84)', shortName: 'Vietnam' },
    { code: '1', acr: 'vg', name: 'Virgin Islands - British (+1)', shortName: '- British' },
    { code: '1', acr: 'vi', name: 'Virgin Islands - US (+1)', shortName: '- US' },
    { code: '681', acr: 'wf', name: 'Wallis and Futuna (+681)', shortName: 'Wallis and Futuna' },
    { code: '969', acr: 'ye', name: 'Yemen (North)(+969)', shortName: 'Nort' },
    { code: '967', acr: 'ye', name: 'Yemen (South)(+967)', shortName: 'Sout' },
    { code: '260', acr: 'zm', name: 'Zambia (+260)', shortName: 'Zambia' },
    { code: '263', acr: 'zw', name: 'Zimbabwe (+263)', shortName: 'Zimbabwe' }
  ];
}
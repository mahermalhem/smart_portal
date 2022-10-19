import * as React from 'react';

export const AuthContext = React.createContext();

export const Countries = [
    {
      title: " الرياض",
      data: [ "المجمعة", "القويعية","الأفلاج", "الزلفي"," وادي الدواسر", "الدرعية", "الخرج", "الدوادمي"," حوطة بني تميم", "شقراء", "رماح" , "ثادق", "حريملاء", "المزاحمية", "الحريق", "الغاط", "السليل", "عفيف", "ضرماء" ]
    },
    {
      title: " مكة المكرمة",
      data: [ "القنفذة","الليث","جدة","الطائف", "رابغ", "الخرمة", "خليص","الكامل"," رنية", "تربة", "الجمجوم" ]
    },
    {
      title: "المدينة المنورة ",
      data: [ "العلا", "ينبع"," بدر" ,"خيبر" ,"المهد" ,"الحناكية"]
    },
    {
      title: "القصيم",
      data: [ "الرس", "المذنب", "عنيزة", "البكيرية","عيون الجواء" , " رياض الخبراء ", "البدائع", "الأسياح", "الشماسية", "النبهانية" ]
    },
    {
        title: "الشرقية ",
        data: ["القطيف", "الخبر"," حفر الباطن" , "الإحساء", "الجبيل", "النعيرية",' رأس تنورة', "أبقيق", "الخرخير"," قرية العليا", "الخفجي" ]
    },
    {
        title: "عسير ",
        data: [ "بيشة", "محايل", "النماص", "خميس مشيط"," أحد رفيدة"," ظهران الجنوب"," تثليث"," رجال المع", "المجاردة", "بلقرن", "سراة عبيدة"]
    },
    {
        title: "تبوك ",
        data: [ "ضباء", "تيماء", "الوجه", "حقل", "أملج"]
    },
    {
        title: "حائل ",
        data: [ "بقعاء", "الشنان", "الغزالة"]
    },
    {
        title: "الحدود الشمالية ",
        data: ["عرعر", "وطريف", "ورفحاء"]
    },
    {
        title: "جازان ",
        data: [ "أبو عريش", "صامطة", "صبيا",
            "الدائر", "أحد المسارحة", "ضمد", "الريث", "العيدابي"," بيش", "الحرث", "العارضة", "القياس", "فراسان"]
    },
    {
        title: "نجران ",
        data: ["شرورة"," بدر الجنوب", "حبونا", "خباش", "يدمة", "ثار" ]
    },
    {
        title: "الباحة ",
        data: ["المندق","المخواه","بلجرشي", "قلوة", "القرى", "العقيق "]
    },
    {
        title: "الجوف  ",
        data: ["القريات","دومة الجندل","سكاكا "]
    },
  ];

  export const CountriesEn = [
    {
      title: " Riyadh ",
      data: [  "Al Majma'ah", "al-Gway'iyyah", "Aflaj", "al-Sulayyil", "Wadi ad-Dawasir", "Dir'iyyah", "Al kharj", "al-Duwadmi"," Hotat Bani Tamim", "Shagra", "Rimah", "Thadig", "Huraymila", "Al-Muzahmiyyah" ,"al-Ghat", "al-Sulayyil", "Afif", "Dhruma"]
    },
    {
        title: "Makkah ",
        data: [ "Al-Qunfudhah"," Al-leith", "jeddah", "ta’if", "Rabigh", "Al-Khurmah", "Khulays", "Al-Kamil", "Ranyah", "Turubah", "Al-Jumum"]
    },
    {
        title: "Al-Madīnah al-Munuwarah ",
        data: ["Al-Ula ", "Yanbu" , "Badr", "Khaybar", "Mahd adh-Dhahab "," Al-Hinaklyah"]
    },
    {
        title: "Al-Qaseem ",
        data: ["Ar-Rass", "Al-Midhnab", "Unaizah", "Al-Bukayriyah", "Uyun al-Jiwa ", "Riyad al-Khabra", "Al-Bada'i'a"," Al-Asyah ", "Ash-Shimaiyah ", "An-Nabhaniyah"]
    },
    {
        title: "Ash-Sharqiyah ( eastern  )",
        data: [ "Al-Qatīf ", "Al-Khubar" , "Hafar al-Batin ", "Al-'Ahsa'" , "Al-Jubail ", "An-Nu'ayriyah ", "R'as Tanurah", "Abqaiq", "Qaryat  al-'Ulya ", "Al-Khafjī -alkharkhir"]
    },
    {
        title: "Aseer ",
        data: ["Bisha" , "Muhayil" , "An-Nimas" , "Khamis Mushait ", "Ahad Rafidah",  "zahran al-Janub" , "Tathlith", "Rijal 'Alma , Al-Majaridah", "Balqarn "," Sarat 'Abidah "]
    },
    {
        title: "Tabouk ",
        data: ["Duba" , "Tayma", "Al-Wajh" , "Haql" , "Umluj" ]
    },
    {
        title: "Ha'il ",
        data: ["Baqaa" , "Ash-Shanan" , "Al-Ghazalah" ]
    },
    {
        title: "Northern Borders ",
        data: ["Ar'ar" , "Turaīf","Rafha"  ]
    },
    {
        title: "Jazan ",
        data: ["Abu 'Arish" , "Samtah", "Sabya" , "ad- dayer", "Ahad al-Masarihah", "Damad", "Ar-Rayth" , "Al-'Aydabi" , "Bīsh" , "Al-Harth", "Al-'Ardah"," Farasan -alqias"]
    },
    ///
    {
        title: "Najran ",
        data: ["Sharurah" , "Badr al-Janub ", "Hubuna" , "Khubash", "Thar", "Yadamah"]
    },
    {
        title: "Al-Bahah ",
        data: ["Al-Mandaq ", "Al-Makhwah ", "Baljurashi ", "Qilwah" , "Al-Qara" ," Al-'Aqiq "]
    },
    {
        title: "Al-Jawf ",
        data: ["Al-Qurayyat", "Dumat al-Jandal" , "Sakaka"]
    },
  ];
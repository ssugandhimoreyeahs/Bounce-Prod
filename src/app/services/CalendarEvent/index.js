import RNCalendarEvents from 'react-native-calendar-events';

class CalendarService {
  checkPermission = async () => {
    try{
      let permissions = await RNCalendarEvents.checkPermissions();
      return Promise.resolve(permissions)
    }catch(error){
      return Promise.reject(error)
    }
  };

  requestPermission = async () => {
    try{
      let req = await RNCalendarEvents.requestPermissions();
      return Promise.resolve(req);
    }catch(error){
      return Promise.reject(error)
    }
  }

  findCalendars = async () => {
    let CalendarId = ''
    try{
      let AllCalenders = await RNCalendarEvents.findCalendars();
      
      if(Platform.OS == "ios"){
        AllCalenders.map(singleCalendar =>{
          if(singleCalendar.source == "Default"){
            CalendarId = singleCalendar.id
          }
        })
      }else{
        AllCalenders.map(singleCalendar =>{
          if(singleCalendar.type == "com.google"){
            CalendarId = singleCalendar.id
          }
        })
        if(CalendarId == ''){
          CalendarId = AllCalenders[0].id;
        }
      }
      Promise.resolve(AllCalenders);
      return CalendarId
    }catch(error){
      return Promise.reject(error)
    }
  }
  
  SaveEvents = async (Title , Data) =>{
    try{
      let SavedRes = await RNCalendarEvents.saveEvent(Title, Data)
      return Promise.resolve(SavedRes)
    }catch(error){
      console.log("Error on Saving Event in Calender ---> ", error);
      Promise.reject(error)
      return 'false';
    }
  }
}

const Calendar = new CalendarService();
export default Calendar;

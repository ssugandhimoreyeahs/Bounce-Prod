import {MinLength, IsInt, Matches, IsNotEmpty, IsEmpty} from 'class-validator';
import {Decorators as D} from '../../Validations';
class Party {
  @IsNotEmpty({message: 'Required title'})
  title = '';
  @IsNotEmpty({message: 'Required Description'})
  description = '';
  @IsNotEmpty({message: 'Required Date'})
  date = '';
  location = '';
  @IsInt({message: 'Invalid Fee'})
  fee = 0;
  @D.PartyAge('toAge', {message: "Invalid Minimum Age"}) 
  fromAge;
  @D.PartyAge('fromAge', {message: "Invalid Maximum Age"})  
  toAge;

  galleryFiles = [];
  address = '';
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = false;
  profileImageFile = '';

  constructor(fields) {
    console.log('PARTY_ENTITY - ', fields);
    try {
      if (fields && typeof fields == 'object') {
        for (let key in fields) {
          Object.keys(this).map(thisK => {
            if (key == thisK) {
              this[key] = fields[key];
            }
          });
        }
        this.fromAge = parseInt(fields['fromAge']) || 0;
        this.toAge = parseInt(fields['toAge']) || 0;
        this.fee = parseInt(fields['fee']) || '';
        if (!isNaN(this.fromAge) && !isNaN(this.toAge)) {
          this.ageLimit = true;
        }
        console.log('PARTY_ENTITY - ' + JSON.stringify(this));
      }
    } catch (error) {
      console.log('PARTY_ENTITY_ERROR - ', error);
    }
  }
}

export default Party;

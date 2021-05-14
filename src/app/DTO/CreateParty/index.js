import {MinLength, IsInt, Matches, IsNotEmpty, IsEmpty} from 'class-validator';
import {Decorators as D} from '../../Validations';

class CreatePartyDTO {
  @IsNotEmpty({message: 'Required title'})
  title = '';

  @IsNotEmpty({message: 'Required Description'})
  description = '';
  date = '';
  location = '';

  @IsInt({message: 'Invalid Fee'})
  fee = 0;

  @D.IsLesserThen('toAge', {message: 'From Age cannot be greater than to age'})
  @IsInt({message: 'Invalid From Age'})
  fromAge = '';

  @IsInt({message: 'Invalid To Age'})
  @IsEmpty()
  toAge = '';

  galleryFiles = [];
  address = '';
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = false;
  profileImageFile = '';

  constructor(fields) {
    console.log('CREATE_DTO_CON - ', fields);
    try {
      if (fields && Object.keys(fields)?.length > 0) {
        for (let key in fields) {
          this[key] = fields[key];
        }
        this.fromAge = parseInt(fields['fromAge']) || '';
        this.toAge = parseInt(fields['toAge']) || '';
        this.fee = parseInt(fields['fee']) || '';
        if (!isNaN(this.fromAge) && !isNaN(this.toAge)) {
          this.ageLimit = true;
        }
        console.log('ASSIGN_CREATE_DTO - ' + JSON.stringify(this));
      }
    } catch (error) {
      console.log('CreatePartyDTO - error - ', error);
    }
  }
}

export default CreatePartyDTO;

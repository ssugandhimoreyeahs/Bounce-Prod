import {
  MinLength,
  IsInt,
  Matches,
  IsNotEmpty,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import {Decorators as D, ValidationTypes} from '../../Validations';
import {toCurrentTimeZone} from '../../utils';
import moment from 'moment';
class Party {
  @IsNotEmpty({message: 'Required title'})
  title;
  @IsNotEmpty({message: 'Required Description'})
  description;

  @IsNotEmpty({message: 'Required Date'})
  date;

  @D.ValidateObjecKey(
    {key: 'addressStr', [ValidationTypes.REQUIRED]: true},
    {message: 'Required Address'},
  )
  location = {
    lat: '1',
    lon: '1',
    addressStr: '',
  };

  @Min(1, {message: 'Required Price'})
  fee;

  @D.PartyAge('toAge', {message: 'Invalid Minimum Age'})
  fromAge;
  @D.PartyAge('fromAge', {message: 'Invalid Maximum Age'})
  toAge;

  @Min(1, {message: 'Required Quantity'})
  quantityAvailable;

  @ArrayNotEmpty({message: 'Required Event Media'})
  galleryFiles = [];
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = false;
  isDraft = false;
  profileImageFile;

  static toCreate = fields => {
    try {
      if (fields && typeof fields == 'object') {
        let newParty = new Party();
        Object.keys(newParty).map(key => {
          newParty[key] = fields[key];
        });
        newParty.fromAge = parseInt(fields['fromAge']) || 0;
        newParty.toAge = parseInt(fields['toAge']) || 0;
        newParty.fee = parseInt(fields['fee']) || 0;
        newParty.quantityAvailable = parseInt(fields['quantityAvailable']) || 0;
        if (newParty.fromAge > 0 && newParty.toAge > 0) {
          newParty.ageLimit = true;
        }
        //newParty.profileImageFile = fields?.galleryFiles[0] || [];
        newParty.date = toCurrentTimeZone(fields.date).toString();
        return newParty;
      }
      return new Party();
    } catch (error) {
      console.log('PARTY_ENTITY_ERROR - ', error);
    }
  };
  static toEdit = fields => {
    let newParty = this.toCreate(fields);
    newParty.date = moment(fields.date).toDate();
    newParty.galleryFiles = fields?.gallery?.map(i => i.filePath);
    console.log('TO_EDIT_TEST - ', newParty);
    return newParty;
  };
}

export default Party;

// for (let key in fields) {
//   Object.keys(this).map(thisK => {
//     if (key == thisK) {
//       this[key] = fields[key];
//     }
//   });
// }

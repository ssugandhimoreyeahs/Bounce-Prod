import {
  MinLength,
  IsInt,
  Matches,
  IsNotEmpty,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import {Decorators as D, ValidationTypes} from '../../Validations';
import {timezoneToUTC} from '../../utils';
import moment from 'moment';
import {Strings} from '../../constants';
class Party {
  @IsNotEmpty({message: Strings.requiredFieldError('Title')})
  title;
  @IsNotEmpty({message: Strings.requiredFieldError('Description')})
  description;

  @IsNotEmpty({message: Strings.requiredFieldError('Date')})
  date;

  @D.ValidateObjecKey(
    {key: 'addressStr', [ValidationTypes.REQUIRED]: true},
    {message: Strings.requiredFieldError('Address')},
  )
  location = {
    lat: '1',
    lon: '1',
    addressStr: '',
  };

  @D.PartyAge('toAge', {message: 'Invalid Minimum Age'})
  fromAge;
  @D.PartyAge('fromAge', {message: 'Invalid Maximum Age'})
  toAge;

  @ArrayNotEmpty({message: Strings.requiredFieldError('Event Media')})
  galleryFiles = [];

  gallery = [];
  @ArrayNotEmpty({message: 'Add atleast 1 Ticket Type'})
  ticket = [];
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = true;
  isDraft = false;
  profileImageFile;
  profileImage;
  static forValidate = (fields, mode = 1) => {
    try {
      if (fields && typeof fields == 'object') {
        let newParty = new Party();
        Object.keys(fields).map(fKey => {
          if (Object.keys(newParty).includes(fKey)) {
            newParty[fKey] = fields[fKey];
          }
        });
        newParty.fromAge = parseInt(fields['fromAge']) || 0;
        newParty.toAge = parseInt(fields['toAge']) || 0;
        newParty.fee = parseInt(fields['fee']) || 0;
        newParty.quantityAvailable = parseInt(fields['quantityAvailable']) || 0;
        if (newParty.fromAge > 0 && newParty.toAge > 0) {
          newParty.ageLimit = true;
        }
        if (fields?.galleryFiles && fields?.galleryFiles[0]) {
          newParty.profileImageFile = fields?.galleryFiles[0].path || [];
        }
        if (mode == 1) {
          newParty.date = fields.date
            ? moment(fields.date).format('YYYY-MM-DD HH:mm:ss')
            : null; //2020-12-25 12:15:00
          newParty.galleryFiles = fields.galleryFiles.map(i => i.path);
        }
        delete newParty.gallery;
        return newParty;
      }
      return new Party();
    } catch (error) {
      console.log('PARTY_ENTITY_ERROR - ', error);
    }
  };
  static toEdit = (fields, type = 2) => {
    try {
      let newParty = this.forValidate(fields, type);
      if (fields.date) {
        newParty.date = timezoneToUTC(fields.date);
      }
      newParty.gallery = fields?.gallery || [];
      newParty.ticket = fields?.tickets;
      newParty.isPrivate = fields?.isPrivate;
      newParty.id = fields.id;
      newParty.profileImage = fields?.profileImage;
      return newParty;
    } catch (error) {
      console.log('ERROR - ', error);
    }
  };
  static forEditValidate = fields => {
    try {
      let newParty = this.toEdit(fields, 1);
      newParty.date = moment(fields.date).format('YYYY-MM-DD HH:mm:ss');
      newParty.gallery = fields?.gallery?.map(i => ({id: i.id})) || [];
      newParty.profileImage = fields?.profileImage?.id || 0;
      newParty.tickets = fields.ticket.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        price: t.price,
        quantity: t.quantity,
      }));
      newParty;
      delete newParty.id;
      delete newParty.profileImageFile;
      return newParty;
    } catch (error) {
      console.log('ERROR - ', error);
    }
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

/*

import {
  MinLength,
  IsInt,
  Matches,
  IsNotEmpty,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import {Decorators as D, ValidationTypes} from '../../Validations';
import {timezoneToUTC} from '../../utils';
import moment from 'moment';
class Party {
  id;
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

  @D.PartyAge('toAge', {message: 'Invalid Minimum Age'})
  fromAge;
  @D.PartyAge('fromAge', {message: 'Invalid Maximum Age'})
  toAge;

  @ArrayNotEmpty({message: 'Required Event Media'})
  galleryFiles = [];

  gallery = [];
  @ArrayNotEmpty({message: 'Add atleast 1 Ticket Type'})
  ticket = [];
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = true;
  isDraft = false;
  profileImageFile;
  profileImage;
  static toCreate = (fields, mode = 1) => {
    try { 
      if (fields && typeof fields == 'object') {
        let newParty = new Party();
        Object.keys(newParty).map(key => {
            if (fields[key]) {
              newParty[key] = fields[key];
            }
        });
        newParty.fromAge = parseInt(fields['fromAge']) || 0;
        newParty.toAge = parseInt(fields['toAge']) || 0;
        newParty.fee = parseInt(fields['fee']) || 0;
        newParty.quantityAvailable = parseInt(fields['quantityAvailable']) || 0;
        if (newParty.fromAge > 0 && newParty.toAge > 0) {
          newParty.ageLimit = true;
        }
        if (fields?.galleryFiles && fields?.galleryFiles[0]) {
          newParty.profileImageFile = fields?.galleryFiles[0].path || [];
        }
        if (mode == 1) {
          newParty.date = moment(fields.date).format('YYYY-MM-DD HH:mm:ss'); //2020-12-25 12:15:00 
          newParty.galleryFiles = fields.galleryFiles.map(i => i.path);
        }
        delete newParty.gallery;
        return newParty;
      }
      return new Party();
    } catch (error) {
      console.log('PARTY_ENTITY_ERROR - ', error);
    }
  };
  static toEdit = fields => {
    try { 
      let newParty = this.toCreate(fields, 2);
      if (fields.date) {
        newParty.date = timezoneToUTC(fields.date);
      }
      newParty.gallery = fields?.gallery || [];
      newParty.ticket = fields?.tickets;
      newParty.isPrivate = fields?.isPrivate;
      newParty.id = fields.id;
      newParty.profileImage = fields?.profileImage;
      return newParty;
    } catch (error) {
      console.log('ERROR - ', error);
    }
  };
  static toEditUpdate = (fields) => {
    try { 
      let newParty = this.toCreate(fields, 1); 
      newParty.gallery = fields?.gallery?.map(i => i.id) || [];
      newParty.ticket = fields?.tickets;
      newParty.isPrivate = fields?.isPrivate;
      newParty.id = fields.id;
      newParty.profileImage = fields?.profileImage;
      return newParty;
    } catch (error) {
      console.log('ERROR - ', error);
    }
  }
  
}

export default Party;

// for (let key in fields) {
//   Object.keys(this).map(thisK => {
//     if (key == thisK) {
//       this[key] = fields[key];
//     }
//   });
// }

*/

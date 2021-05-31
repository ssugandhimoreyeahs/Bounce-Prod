import {
  MinLength,
  IsInt,
  Matches,
  IsNotEmpty,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import {ValidationTypes} from '../../Validations';
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

  // @D.ValidateObjecKey(
  //   {key: 'addressStr', [ValidationTypes.REQUIRED]: true},
  //   {message: Strings.requiredFieldError('Address')},
  // )
  location = {
    lat: '1',
    lon: '1',
    addressStr: '',
  };

  // @D.PartyAge('toAge', {message: 'Invalid Minimum Age'})
  fromAge;
  // @D.PartyAge('fromAge', {message: 'Invalid Maximum Age'})
  toAge;

  @ArrayNotEmpty({message: Strings.requiredFieldError('Event Media')})
  galleryFiles = [];

  gallery = [];
  @ArrayNotEmpty({message: 'Add atleast 1 Ticket Type'})
  tickets = [];
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = true;
  isDraft = false;
  profileImageFile;
  profileImage;

  static fromJSON = fields => {
    try {
      let newParty = this.toJSON(fields);
      if (fields.date) {
        newParty.date = timezoneToUTC(fields.date);
      } 
      newParty.gallery = fields?.gallery || [];
      newParty.tickets = fields?.tickets;
      newParty.isPrivate = fields?.isPrivate;
      newParty.profileImage = fields?.profileImage;
      return newParty;
    } catch (error) {
      console.log('PARTY_ENTITY_FROM_JSON - ', error);
    }
  };
  static toJSON = (fields, isEdit = false) => {
    try {
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
        newParty.galleryFiles = fields.galleryFiles.map(i => i.path);
        newParty.profileImageFile = fields?.galleryFiles[0].path || [];
      }
      newParty.date = fields.date
        ? moment(fields.date).format('YYYY-MM-DD HH:mm:ss')
        : null; //2020-12-25 12:15:00
      newParty.isPrivate = fields.isPrivate;
      delete newParty.gallery;
      if (isEdit) {
        newParty.gallery = fields?.gallery?.map(i => ({id: i.id})) || [];
        newParty.profileImage = fields?.profileImage?.id || 0;
        newParty.tickets = fields.tickets.map(t => {
          let obj = {
            title: t.title,
            description: t.description,
            price: t.price,
            quantity: t.quantity,
          };
          if (t?.id) {
            obj.id = t.id;
          }
          return obj;
        });
        delete newParty.id;
        delete newParty.profileImageFile;
      }
      return newParty;
    } catch (error) {
      console.log('PARTY_ENTITY_TOJSON - ', error);
    }
  };
}

export default Party;

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
      newParty.ticket = fields.ticket.map(t => {
        let obj = {
          title: t.title,
          description: t.description,
          price: t.price,
          quantity: t.quantity,
        };
        if (t?.id) {
          obj.id = t.id;
        }
        return obj;
      });
      delete newParty.id;
      delete newParty.profileImageFile;
      return newParty;
    } catch (error) {
      console.log('ERROR - ', error);
    }
  };
}

export default Party;

*/

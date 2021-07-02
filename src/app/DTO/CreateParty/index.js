import {
  Party as CreatePartyEntity,
  Ticket as TicketEntity,
} from '../../Entities';
import {ReactModel} from '../../core';
import {ClassValidator} from '../../Validations';

@ReactModel()
class CreatePartyDTO extends CreatePartyEntity {
  partyError = {};

  set = fields => {
    for (key in fields) {
      if (this.partyError[key]) {
        delete this.partyError[key];
      }
      this[key] = fields[key];
    }
    this.notifyListeners();
  };
  setAddress = addressStr => {
    this.location.addressStr = addressStr;
    this.notifyListeners();
  };
  addGallery = images => {
    this.galleryFiles.push(...images);
    this.notifyListeners();
  };

  removeGallery = (action = false, image) => {
    if (action == false) {
      let findIndex = this.galleryFiles.findIndex(i => i.path == image);
      if (findIndex > -1) {
        this.galleryFiles.splice(findIndex, 1);
      }
    } else {
      let findIndex = this.gallery.findIndex(i => i.filePath == image);
      if (findIndex > -1) {
        this.gallery.splice(findIndex, 1);
      }
    }

    this.notifyListeners();
  };
  setIsPrivate = value => {
    this.isPrivate = value;
    this.notifyListeners();
  };
  isPartyValid = async (isDraftMode = false, isEditMode = false) => {
    let validateParty = CreatePartyEntity.toJSON(this, isEditMode);
    validateParty.isDraft = isDraftMode;
    let schema = {success: false, partyFields: validateParty, error: {}};
    if (validateParty.galleryFiles.length == 0) {
      validateParty.galleryFiles.push(undefined);
    }
    const isValid = await ClassValidator.isValidate(validateParty);
    if (!isValid.success) {
      console.log('ERROR_PARTY - ', JSON.stringify(isValid));
      schema.error = isValid.errors;
    } else {
      schema.success = true;
      if (validateParty.galleryFiles[0] == undefined) {
        delete validateParty.galleryFiles;
      }
    }
    return schema;
  };

  reset = (preParty = {}) => {
    if (Object.keys(preParty).length == 0) {
      Object.assign(this, new CreatePartyEntity());
    } else {
      Object.assign(this, CreatePartyEntity.fromJSON(preParty));
    }
    this.notifyListeners();
  };

  addTicketType = () => {
    this.tickets.push(new TicketEntity());
    this.notifyListeners();
  };

  onTicketChangeText = (data, index) => {
    this.tickets[index] = {...this.tickets[index], ...data};
    this.notifyListeners();
  };

  onTicketDelete = index => {
    this.tickets = [...this.tickets.filter((_, i) => i != index)];
    this.notifyListeners();
  };

  addTags = ({tag, subTags}) => {
    try {
      let newTag = [...this.partyTags];
      let {tagIndex, tagExist, subTagIndex, subTagExist} = this.isSubTagExist(
        tag,
        subTags,
      );
      if (tagExist && subTagExist) {
        if (newTag[tagIndex].subTags.length == 1) {
          newTag = newTag.filter(i => i.id != tag.id);
        } else {
          newTag[tagIndex].subTags = newTag[tagIndex].subTags.filter(
            sT => sT.id != subTags.id,
          );
        }
      } else if (!tagExist && !subTagExist) {
        let newTagData = {
          ...tag,
          subTags: [subTags],
        };
        newTag.push(newTagData);
      } else if (!subTagExist) {
        newTag[tagIndex].subTags.push(subTags);
      }

      this.partyTags = newTag;
      this.notifyListeners();
    } catch (error) {
      console.log('ADD_TAGS_ERROR - ', error);
    }
  };

  isSubTagExist = (tag, subTag) => {
    // don't do any side effect to be call in declarative code
    let result = {
      tagIndex: -1,
      tagExist: false,
      subTagIndex: -1,
      subTagExist: false,
    };
    let tagIndex = this.partyTags.findIndex(t => tag.id == t.id);
    if (tagIndex == -1) {
      return result;
    }
    result.tagIndex = tagIndex;
    result.tagExist = true;
    let subTagIndex = this.partyTags[tagIndex].subTags.findIndex(
      sT => sT.id == subTag.id,
    );
    if (subTagIndex == -1) {
      return result;
    }
    result.subTagIndex = subTagIndex;
    result.subTagExist = true;
    return result;
  };
}

export default CreatePartyDTO;

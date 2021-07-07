import TagSubCategory from '../TagSubCategory';

class TagCategory {
  id = 0;
  name = '';
  subTags = [];
 
  isSubTagExist = subTag => {
      return this.subTags.findIndex(sT => sT.id == subTag.id);
  }
  fromSelect = subTag => {
    let category = this.clone();
    category.subTags = [];
    category.subTags.push(new TagSubCategory.fromJSON(subTag));
    return category;
  };
  toggleSubTag = subTag => {
    let category = this.clone();
    let subTagIndex = category.subTags.findIndex(s => subTag.id == s.id);
    if (subTagIndex == -1) {
      category.subTags.push(new TagSubCategory.fromJSON(subTag));
    } else {
      category.subTags = category.subTags.filter((_, i) => i != subTagIndex);
    }

    return category;
  };
  static fromJSON(tags = {}) {
    let tagCategory = new TagCategory();
    tagCategory.id = tags.id;
    tagCategory.name = tags.name;

    tags.subTags.map(subTag => {
      tagCategory.subTags.push(new TagSubCategory.fromJSON(subTag));
    });

    return tagCategory;
  }
  clone = () => {
    return TagCategory.fromJSON(this);
  };
}

export default TagCategory;

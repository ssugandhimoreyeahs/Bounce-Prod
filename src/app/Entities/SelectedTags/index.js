class SelectedTags {
    tags = [];
    static instance;
  
    setTags = tags => {
      this.tags = tags;
      return this;
    };
    onSelectTag = (tag, subTags) => {
      try {
        let r = this.isTagSelected(tag, subTags);
         
        if (!r.tagExist) {
          this.tags.push(tag.fromSelect(subTags));
        } else {
          this.tags[r.tagIndex] = this.tags[r.tagIndex].toggleSubTag(subTags);
          if (this.tags[r.tagIndex].subTags.length == 0) {
            this.tags = this.tags.filter((_, i) => i != r.tagIndex);
          }
        }
        return [...this.tags];
      } catch (error) {
        console.log('ERROR_ONSELECT - ', error);
      }
    };
    isTagSelected = (tag, subTag) => {
      let result = {
        tagIndex: -1,
        subTagIndex: -1,
        tagExist: false,
        subTagExist: false,
      };
      let tagIndex = this.tags.findIndex(t => tag.id == t.id);
      if (tagIndex == -1) {
        return result;
      }
      result.tagIndex = tagIndex;
      result.tagExist = true;
      let subTagIndex = this.tags[tagIndex].isSubTagExist(subTag);
      if (subTagIndex == -1) {
        return result;
      } else {
        result.subTagIndex = subTagIndex;
        result.subTagExist = true;
        return result;
      }
    }; 
    static getInstance = () => {
      if (!this.instance) {
        this.instance = new SelectedTags();
      }
      return this.instance;
    };
  }
  
  export default SelectedTags.getInstance();
  
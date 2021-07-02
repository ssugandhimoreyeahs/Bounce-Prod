

class TagSubCategory {

    id = 0;
    name = '';
    emoji = '';
    constructor(subTags) {
        if (subTags) {
            Object.assign(this, subTags);
        }
    }
    static fromJSON = (subTag) => {
        let tagSubCategory = new TagSubCategory();
        tagSubCategory.id = subTag.id;
        tagSubCategory.name = subTag.name;
        tagSubCategory.emoji = subTag.emoji;
        return tagSubCategory;
    }
    clone = () => {
        return TagSubCategory.fromJSON(this);
    }
}

export default TagSubCategory;
import TagSubCategory from "../TagSubCategory";


class TagCategory {
    id = 0;
    name = '';
    subTags = [];

    newAdded = (subCategory) => {
        let tagC = new TagCategory();
        Object.assign(tagC, this);
        tagC.subTags = [];
        tagC.subTags.push(new TagSubCategory(subCategory));
        return tagC;
    }
    toggleSubTags = (subTags) => {
        console.log("INSIDE_TOGGLE_SUB_TAGS ", JSON.stringify(subTags));
        let subTagIndex = this.subTags.findIndex(s => s.id == subTags.id);
        if (subTagIndex == -1) {
            this.subTags.push(new TagSubCategory(subTags));
        } else {
            this.subTags = this.subTags.filter((_, i) => i != subTagIndex);
        }
        return { ...this };
    }
    static fromJSON(tags = {}) {
        let tagCategory = new TagCategory();
        tagCategory.id = tags.id;
        tagCategory.name = tags.name;

        tags.subTags.map((subTag) => {
            tagCategory.subTags.push(new TagSubCategory.fromJSON(subTag));
        });

        return tagCategory;
    }
    clone = () => {
        return { ...this };
    }

}

export default TagCategory;
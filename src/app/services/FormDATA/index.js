import { RegexCollection } from '../../constants';
import is from 'is_js';

class FormDATA {
    form;
    appendToFormData = (key, value) => {
         if(value == undefined) {
             return; 
         }
        if(is.string(value) && RegexCollection.FileRegex.test(value)) {
            this.form.append(key, this.createFormDataImage(value));
        }else if (is.date(value)) {
            this.form.append(key, value == null ? null : value.toISOString());
        }else if(is.not.object(value)) {
            this.form.append(key, value == null ? null : value.toString());
        }else {
            this.form.append(key, value == null ? null : JSON.stringify(value));
        }
    }
    objectToFormData = (obj) => {
        this.form = new FormData();

        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (value && value.forEach) {
                value.forEach((item) => {
                    this.appendToFormData(key, item);
                });
            }else {
                this.appendToFormData(key, value);
            }
        });

        return this.form;
    }


    getFileExtension = (filePath) => {
        const regex = RegexCollection.FileExtension;
        const fileName = this.getFileNameFormPath(filePath);
        return regex.exec(fileName)[1] || 'jpg';
    }
    getFileNameFormPath = (filePath) => {
        return String(filePath).replace(RegexCollection.FileName, '');
    }
    createFormDataImage = (filePath) => {
        return {
            name: this.getFileNameFormPath(filePath),
            type : `image/${this.getFileExtension(filePath)}`,
            uri: filePath
        }
    }
    static instance;
    static getInstance() {
        if(!this.instance) {
            this.instance = new FormDATA();
        }
        return this.instance;
    }
}

export default FormDATA.getInstance();
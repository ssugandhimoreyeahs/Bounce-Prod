
class RegexCollection {

    //Validation Regex
    static requiredString = /^(\S+)$/;
    static stringNumber = /^[0-9]*$/;
    // 
    static FileRegex = /((content|file):\/)?\/.*/;
    static FileName = /^.*[\\\/]/;
    static FileExtension = /(?:\.([^.]+))?$/;
}   

export default RegexCollection;
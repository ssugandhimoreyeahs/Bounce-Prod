
class RegexCollection {

    //Validation Regex
    static requiredString = /^(\S+)$/;
    
    // 
    static FileRegex = /((content|file):\/)?\/.*/;
    static FileName = /^.*[\\\/]/;
    static FileExtension = /(?:\.([^.]+))?$/;
}   

export default RegexCollection;
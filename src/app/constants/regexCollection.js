
class RegexCollection {

    static DateFormat = 'mm/dd/yyyy';
    static DateTimeFormat = 'mm/dd/yyyy HH:MM:ss';
    static TimeFormat = 'HH:mm';
    //Validation Regex
    static requiredString = /^(\S+)$/;
    static stringNumber = /^[0-9]*$/;
    // 
    static FileRegex = /((content|file):\/)?\/.*/;
    static FileName = /^.*[\\\/]/;
    static FileExtension = /(?:\.([^.]+))?$/;
}   

export default RegexCollection;
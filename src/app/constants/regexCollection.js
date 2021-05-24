
class RegexCollection {

    static DateFormat = 'mm/dd/yyyy';
    static DateTimeFormat = 'MM/DD/yyyy HH:mm:ss';
    static TimeFormat = 'HH:mm';
    static PartyTimeFormat = 'MMM. DD, HH:mm A';
    //Validation Regex
    static requiredString = /^(\S+)$/;
    static stringNumber = /^[0-9]*$/;
    // 
    static FileRegex = /((content|file):\/)?\/.*/;
    static FileName = /^.*[\\\/]/;
    static FileExtension = /(?:\.([^.]+))?$/;
}   

export default RegexCollection;
module.exports = {
  truncate: (str, len) => {
  if (str.length > len && str.length > 0) {
    var newStr = str + " ";
    newStr = str.substr(0, len);
    newstr = str.substr(0, newStr.lastIndexOf(" "));
    newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
    return newStr + "...";
    } else {return str;}
  },
  stripTags: input => input.replace(/<(?:.|\n)*?>/gm, "")
}

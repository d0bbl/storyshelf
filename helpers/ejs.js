var moment = require('moment');
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
  stripTags: input => input.replace(/<(?:.|\n)*?>/gm, ""),
  formatDate: (date, format) => {
    return moment(date).format(format);
  },
  select: (selected, options) => {
    return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
  },
  editIcon: (storyUser, loggedUser, storyId, floating = true) => {
    if(storyUser == loggedUser){
      if(floating){
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
      } else {
        return `<a href="/stories/edit/${storyId}" style="font-size: 25px;"><i class="fa fa-pencil"></i></a>`;
      }
    } else {
      return '';
    }
  }
}
